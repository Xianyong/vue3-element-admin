import request from "@/utils/request";

const BIZORDERS_BASE_URL = "/api/v1/biz-orders";

const BizOrdersAPI = {
  /** 获取订单分页数据 */
  getPage(queryParams?: BizOrdersPageQuery) {
    return request<any, PageResult<BizOrdersPageVO[]>>({
      url: `${BIZORDERS_BASE_URL}/page`,
      method: "get",
      params: queryParams,
    });
  },
  /**
   * 获取订单表单数据
   *
   * @param id 订单ID
   * @returns 订单表单数据
   */
  getFormData(id: number) {
    return request<any, BizOrdersForm>({
      url: `${BIZORDERS_BASE_URL}/${id}/form`,
      method: "get",
    });
  },

  /**
   *  添加订单
   *
   *  @param data 订单表单数据
   */
  create(data: BizOrdersForm) {
    return request({
      url: `${BIZORDERS_BASE_URL}`,
      method: "post",
      data,
    });
  },

  /**
   *  添加订单
   *
   *  @param data 订单表单数据
   */
  buy(data: BizOrdersForm) {
    return request({
      url: `${BIZORDERS_BASE_URL}/buy`,
      method: "post",
      data,
    });
  },
  /**
   * 更新订单
   *
   * @param id 订单ID
   * @param data 订单表单数据
   */
  update(id: string, data: BizOrdersForm) {
    return request({
      url: `${BIZORDERS_BASE_URL}/${id}`,
      method: "put",
      data,
    });
  },

  /**
   * 批量删除订单，多个以英文逗号(,)分割
   *
   * @param ids 订单ID字符串，多个以英文逗号(,)分割
   */
  deleteByIds(ids: string) {
    return request({
      url: `${BIZORDERS_BASE_URL}/${ids}`,
      method: "delete",
    });
  },
};

export default BizOrdersAPI;

/** 订单分页查询参数 */
export interface BizOrdersPageQuery extends PageQuery {}

/** 订单表单对象 */
export interface BizOrdersForm {
  /** 订单唯一标识符 */
  id?: number;
  /** 站点ID，外键关联部门表 */
  repoId?: number;
  /** 用户ID，外键关联用户表 */
  userId?: number;
  /** 购买数量 */
  quantity?: number;
  /** 商品单价（下单时价格） */
  unitPrice?: number;
  /** 订单总金额 */
  totalAmount?: number;
  /** 订单日期（下单时间） */
  orderDate?: Date;
  /** 记录创建人（用户ID） */
  createBy?: number;
  /** 记录创建时间 */
  createTime?: Date;
  /** 记录最后修改人 */
  updateBy?: number;
  /** 记录最后修改时间 */
  updateTime?: Date;
}

/** 订单分页对象 */
export interface BizOrdersPageVO {
  /** 订单唯一标识符 */
  id?: number;
  /** 站点ID，外键关联部门表 */
  repoId?: number;
  /** 用户ID，外键关联用户表 */
  userId?: number;
  /** 用户名称 */
  userName?: string;
  /** 部门名称 */
  departmentName?: string;
  /** 产品名称 */
  productName?: string;
  /** 购买数量 */
  quantity?: number;
  /** 商品单价（下单时价格） */
  unitPrice?: number;
  /** 订单总金额 */
  totalAmount?: number;
  /** 订单日期（下单时间） */
  orderDate?: Date;
  /** 记录创建人（用户ID） */
  createBy?: number;
  /** 记录创建时间 */
  createTime?: Date;
  /** 记录最后修改人 */
  updateBy?: number;
  /** 记录最后修改时间 */
  updateTime?: Date;
}
