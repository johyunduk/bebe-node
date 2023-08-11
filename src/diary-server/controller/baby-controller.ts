import UserBaby from '@global-common/db/model/user-baby'
import { BadRequest, INVALID_REQUEST, NO_DATA } from '@global-common/error/http-error'

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
  const baby = UserBaby().findOne({ where: { userId } })

  if (baby) throw new BadRequest(INVALID_REQUEST, '이미 등록된 아이가 있습니다.')

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
  const baby = await UserBaby().findOne({ where: { id: babyId } })

  if (!baby) throw new BadRequest(NO_DATA, '해당 아이가 없습니다.')

  const fileName = file.filename

  await baby.update({ face: fileName })
}
