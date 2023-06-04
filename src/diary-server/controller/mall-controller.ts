import MallItem from '@global-common/db/model/mall-item'
import Category from '@global-common/db/model/category'
import { BadRequest, NO_DATA } from '@global-common/error/http-error'
import ItemCategory from '@global-common/db/model/item-category'
import { getLogger } from '@global-common/utils/logger'

const logger = getLogger('mall-controller.ts')

export async function saveCategory (name: string) {
  const category = await Category().findOne({ where: { name } })

  if (category) throw new BadRequest(NO_DATA, '이미 존재하는 카테고리입니다.')

  await Category().create({ name })
}

interface itemParam {
  categoryId: number
  name: string
  price: number
  description: string
}
export async function saveItem (param: itemParam, file) {
  const { categoryId, name, price, description } = param

  const category = await Category().findOne({ where: { id: categoryId } })

  if (!category) throw new BadRequest(NO_DATA, '존재하지 않는 카테고리입니다.')

  const item = await MallItem().create({ name, price, description })

  const itemId = item.id

  logger.info(`itemId: ${itemId}`)

  const itemCategory = await ItemCategory().findOne({ where: { mallItemId: itemId, categoryId } })

  if (!itemCategory) {
    await ItemCategory().create({ mallItemId: itemId, categoryId })
  }

  if (!file) throw new BadRequest(NO_DATA, '이미지 파일이 없습니다.')

  const fileName = file.filename

  await item.update({ image: fileName })
}

export async function fetchItemList (param: {categoryId?: number, page?: number}) {
  const { categoryId, page } = param

  const where: any = {}

  if (categoryId) where.categoryId = categoryId
  if (page) {
    where.offset = (page - 1) * 10
    where.limit = 10
  }

  const { count, rows } = await MallItem().findAndCountAll({
    attributes: ['id', 'name', 'price', 'description', 'image'],
    where,
    orderBy: [['id', 'DESC']],
    include: {
      model: ItemCategory(),
      attributes: ['id'],
      include: {
        model: Category(),
        attributes: ['name'],
      },
    },
  })

  const items = rows.map(row => {
    row.image = row.image ? `https://api.mybebe.net/uploads/images/${row.image}` : null
    return row
  })

  return {
    count,
    items,
  }
}
