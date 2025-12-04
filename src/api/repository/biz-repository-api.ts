import request from "@/utils/request";

const BIZREPOSITORY_BASE_URL = "/api/v1/repository";

const BizRepositoryAPI = {
  /** 获取商品选购分页数据 */
  getPage(queryParams?: BizRepositoryPageQuery) {
    return request<any, PageResult<BizRepositoryPageVO[]>>({
      url: `${BIZREPOSITORY_BASE_URL}/page`,
      method: "get",
      params: queryParams,
    });
  },
  /**
   * 获取商品选购表单数据
   *
   * @param id 商品选购ID
   * @returns 商品选购表单数据
   */
  getFormData(id: number) {
    return request<any, BizRepositoryForm>({
      url: `${BIZREPOSITORY_BASE_URL}/${id}/form`,
      method: "get",
    });
  },

  /**
   *  添加商品选购
   *
   *  @param data 商品选购表单数据
   */
  create(data: BizRepositoryForm) {
    return request({
      url: `${BIZREPOSITORY_BASE_URL}`,
      method: "post",
      data,
    });
  },

  /**
   * 更新商品选购
   *
   * @param id 商品选购ID
   * @param data 商品选购表单数据
   */
  update(id: string, data: BizRepositoryForm) {
    return request({
      url: `${BIZREPOSITORY_BASE_URL}/${id}`,
      method: "put",
      data,
    });
  },

  /**
   * 批量删除商品选购，多个以英文逗号(,)分割
   *
   * @param ids 商品选购ID字符串，多个以英文逗号(,)分割
   */
  deleteByIds(ids: string) {
    return request({
      url: `${BIZREPOSITORY_BASE_URL}/${ids}`,
      method: "delete",
    });
  },

  /**
   * Product restocking API
   * @param deptId - Department ID where restocking occurs
   * @param productId - Product ID to restock
   * @param quantity - Quantity to restock
   * @returns Promise with restocking result
   */
  restock(deptId: number, productId: number, quantity: number) {
    console.log("restock", deptId, productId, quantity);
    return request({
      url: `${BIZREPOSITORY_BASE_URL}/restock`,
      method: "post",
      data: {
        departmentId: deptId,
        productId,
        currentQuantity: quantity,
      },
    });
  },
};

export default BizRepositoryAPI;

/** 商品选购分页查询参数 */
export interface BizRepositoryPageQuery extends PageQuery {
  /** 站点ID，外键关联部门表 */
  departmentId?: number;
  /** 产品ID，外键关联产品表 */
  productId?: number;
  /** 站点名称、产品名称，用于模糊搜索 */
  keyword?: string;
}

/** 商品选购表单对象 */
export interface BizRepositoryForm {
  /** 关系记录唯一标识符 */
  id?: number;
  /** 部门ID，外键关联部门表 */
  departmentId?: number;
  /** 产品ID，外键关联产品表 */
  productId?: number;
  /** 当前库存数量 */
  currentQuantity?: number;
  /** 累计订购数量 */
  orderQuantityTotal?: number;
  /** 最近订购日期 */
  orderDateLatest?: Date;
  /** 记录创建时间 */
  createTime?: Date;
  /** 记录最后更新时间 */
  updateTime?: Date;
  createBy?: number;
  updateBy?: number;
}

/** 商品选购分页对象 */
export interface BizRepositoryPageVO {
  /** 关系记录唯一标识符 */
  id?: number;
  /** 部门ID，外键关联部门表 */
  departmentId?: number;
  /** 部门名称 */
  departmentName?: string;
  /** 产品ID，外键关联产品表 */
  productId?: number;
  /** 产品名称 */
  productName?: string;
  /** 当前库存数量 */
  currentQuantity?: number;
  /** 累计订购数量 */
  orderQuantityTotal?: number;
  /** 最近订购日期 */
  orderDateLatest?: Date;
  /** 记录创建时间 */
  createTime?: Date;
  /** 记录最后更新时间 */
  updateTime?: Date;
  createBy?: number;
  updateBy?: number;
}
