import UserBaby from '@global-common/db/model/user-baby'
import { BadRequest, NO_DATA } from '@global-common/error/http-error'

export async function loadBabyList (userId: number) {
  const list = await UserBaby().findAll({
    where: {
      userId,
    },
    order: [['id', 'DESC']],
    raw: true,
  })

  return list.map(baby => {
    return {
      ...baby,
      face: baby.face ? `https://api.mybebe.net/uploads/images/${baby.face}` : null,
    }
  })
}

export async function saveBaby (params, userId) {
  await UserBaby().create({
    ...params,
    userId,
  })
}

export async function modifyBaby (params, id) {
  const baby = await UserBaby().findOne({ where: { id } })

  if (!baby) throw new BadRequest(NO_DATA, '해당 아이가 없습니다.')

  await baby.update(params)
}

export async function removeBaby (id) {
  await UserBaby().destroy({
    where: {
      id,
    },
  })
}

export async function saveBabyFace (userId, babyId, file) {
  const baby = await UserBaby().findOne({ id: babyId })

  if (!baby) throw new BadRequest(NO_DATA, '해당 아이가 없습니다.')

  const fileName = file.filename

  await baby.update({ face: fileName })
}
