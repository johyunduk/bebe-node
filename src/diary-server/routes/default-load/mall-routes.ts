import { Router } from 'express'
import asyncHandler from '@global-common/server/routes/helper/asyncHandler'
import { adminGuard, diaryGuard } from '@diary-server/routes/middleware/userGuard'
import { validateInputData } from '@global-common/utils/validator'
import Joi from 'joi'
import {
  fetchCategoryList,
  fetchItemDetail,
  fetchItemList, modifyItem,
  saveCategory,
  saveItem,
} from '@diary-server/controller/mall-controller'
import { sendOk } from '@global-common/server/routes/helper/utils'
import { localUpload } from '@global-common/middleware/local-upload'

export default function mallRoutes (router = Router()) {
  // 쇼핑몰 사이즈 목록
  router.get('/mall/size', asyncHandler(getSizeList))
  // 쇼핑몰 카테고리 등록
  router.post('/mall/category', diaryGuard, asyncHandler(postMallCategory))
  // 쇼핑몰 카테고리 목록
  router.get('/mall/category', diaryGuard, asyncHandler(getMallCategory))
  // 쇼핑몰 상품 등록
  router.post('/mall/item', diaryGuard, localUpload.single('file'), asyncHandler(postMallItem))
  // 쇼핑몰 리스트 조회
  router.get('/mall/item', asyncHandler(getMallList))
  // 쇼핑몰 상품 상세
  router.get('/mall/item/:id', diaryGuard, asyncHandler(getMallDetail))
  // 쇼핑몰 상품 수정
  router.put('/mall/item/:id', diaryGuard, localUpload.single('file'), asyncHandler(putMallItem))

  async function getSizeList (req, res) {
    const sizeList = [
      { id: 1, name: 'S' },
      { id: 2, name: 'M' },
      { id: 3, name: 'L' },
      { id: 4, name: 'XL' },
      { id: 5, name: 'XXL' },
    ]

    res.json(sizeList)
  }

  async function postMallCategory (req, res) {
    const { body } = req

    const { name } = validateInputData(body, {
      name: Joi.string().required(),
    })

    await saveCategory(name)

    sendOk(res)
  }

  async function getMallCategory (req, res) {
    const result = await fetchCategoryList()

    res.json(result)
  }

  async function postMallItem (req, res) {
    const { body } = req

    const param = validateInputData(body, {
      categoryId: Joi.number().required(),
      name: Joi.string().required(),
      price: Joi.number().required(),
      description: Joi.string().required(),
    })

    await saveItem(param, req.file)

    sendOk(res)
  }
  async function getMallList (req, res) {
    const { query } = req

    const param = validateInputData(query, {
      categoryId: Joi.number(),
      page: Joi.number(),
    })

    const result = await fetchItemList(param)

    res.json(result)
  }

  async function getMallDetail (req, res) {
    const result = await fetchItemDetail(req.params.id)

    res.json(result)
  }

  async function putMallItem (req, res) {
    const { body, params } = req

    const param = validateInputData(body, {
      categoryId: Joi.number().required(),
      name: Joi.string().required(),
      price: Joi.number().required(),
      description: Joi.string().required(),
    })

    param.id = params.id

    await modifyItem(param, req.file)

    sendOk(res)
  }

  return router
}
