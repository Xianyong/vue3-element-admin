<template>
  <div class="app-container h-full flex flex-1 flex-col">
    <!-- 搜索 -->
    <page-search
      ref="searchRef"
      :search-config="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    >
    </page-search>

    <!-- 列表 -->
    <page-content
      ref="contentRef"
      :content-config="contentConfig"
      @add-click="handleAddClick"
      @export-click="handleExportClick"
      @search-click="handleSearchClick"
      @toolbar-click="handleToolbarClick"
      @operate-click="handleOperateClick"
      @filter-change="handleFilterChange"
    >
    </page-content>

    <!-- 新增 -->
    <page-modal ref="addModalRef" :modal-config="addModalConfig" @submit-click="handleSubmitClick">
    </page-modal>

    <!-- 编辑 -->
    <page-modal ref="editModalRef" :modal-config="editModalConfig" @submit-click="handleSubmitClick">
    </page-modal>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "BizOrders" });

import BizOrdersAPI, { BizOrdersForm, BizOrdersPageQuery } from "@/api/orders/biz-orders-api";
import type { IObject, IModalConfig, IContentConfig, ISearchConfig } from "@/components/CURD/types";
import usePage from "@/components/CURD/usePage";

// 组合式 CRUD
const {
  searchRef,
  contentRef,
  addModalRef,
  editModalRef,
  handleQueryClick,
  handleResetClick,
  handleAddClick,
  handleEditClick,
  handleSubmitClick,
  handleExportClick,
  handleSearchClick,
  handleFilterChange,
} = usePage();

// 搜索配置
const searchConfig: ISearchConfig = reactive({
  permPrefix: "orders:biz-orders",
  formItems: [
  ],
});

// 列表配置
const contentConfig: IContentConfig<BizOrdersPageQuery> = reactive({
  // 权限前缀
  permPrefix: "orders:biz-orders",
  table: {
    border: true,
    highlightCurrentRow: true,
  },
  // 主键
  pk: "id",
  // 列表查询接口
  indexAction: BizOrdersAPI.getPage,
  // 删除接口
  deleteAction: BizOrdersAPI.deleteByIds,
  // 数据解析函数
  parseData(res: any) {
    return {
      total: res.total,
      list: res.list,
    };
  },
  // 分页配置
  pagination: {
    background: true,
    layout: "total, sizes, prev, pager, next, jumper",
    pageSize: 20,
    pageSizes: [10, 20, 30, 50],
  },
  // 工具栏配置
  toolbar: ["add", "delete"],
  defaultToolbar: ["refresh", "filter"],
  // 表格列配置
  cols: [
    { type: "selection", width: 55, align: "center" },
    { label: "订单唯一标识符", prop: "id" },
    { label: "站点ID，外键关联部门表", prop: "repoId" },
    { label: "用户ID，外键关联用户表", prop: "userId" },
    { label: "购买数量", prop: "quantity" },
    { label: "商品单价（下单时价格）", prop: "unitPrice" },
    { label: "订单总金额", prop: "totalAmount" },
    { label: "订单日期（下单时间）", prop: "orderDate" },
    { label: "记录创建人（用户ID）", prop: "createBy" },
    { label: "记录创建时间", prop: "createTime" },
    { label: "记录最后修改人", prop: "updateBy" },
    { label: "记录最后修改时间", prop: "updateTime" },
    {
      label: "操作",
      prop: "operation",
      width: 220,
      templet: "tool",
      operat: ["edit", "delete"],
    },
  ],
});

// 新增配置
const addModalConfig: IModalConfig<BizOrdersForm> = reactive({
  // 权限前缀
  permPrefix: "orders:biz-orders",
  // 主键
  pk: "id",
  // 弹窗配置
  dialog: {
    title: "新增",
    width: 800,
    draggable: true,
  },
  form: {
    labelWidth: 100,
  },
  // 表单项配置
  formItems: [
    {
      type: "input",
      attrs: {
        placeholder: "订单唯一标识符"
      },
      label: "订单唯一标识符",
      prop: "id",
    },
    {
      type: "input",
      attrs: {
        placeholder: "站点ID，外键关联部门表"
      },
      rules: [{ required: true, message: "站点ID，外键关联部门表不能为空", trigger: "blur" }],
      label: "站点ID，外键关联部门表",
      prop: "repoId",
    },
    {
      type: "input",
      attrs: {
        placeholder: "用户ID，外键关联用户表"
      },
      rules: [{ required: true, message: "用户ID，外键关联用户表不能为空", trigger: "blur" }],
      label: "用户ID，外键关联用户表",
      prop: "userId",
    },
    {
      type: "input",
      attrs: {
        placeholder: "购买数量"
      },
      rules: [{ required: true, message: "购买数量不能为空", trigger: "blur" }],
      label: "购买数量",
      prop: "quantity",
    },
    {
      type: "input",
      attrs: {
        placeholder: "商品单价（下单时价格）"
      },
      rules: [{ required: true, message: "商品单价（下单时价格）不能为空", trigger: "blur" }],
      label: "商品单价（下单时价格）",
      prop: "unitPrice",
    },
    {
      type: "input",
      attrs: {
        placeholder: "订单总金额"
      },
      rules: [{ required: true, message: "订单总金额不能为空", trigger: "blur" }],
      label: "订单总金额",
      prop: "totalAmount",
    },
    {
      type: "input",
      attrs: {
        placeholder: "订单日期（下单时间）"
      },
      rules: [{ required: true, message: "订单日期（下单时间）不能为空", trigger: "blur" }],
      label: "订单日期（下单时间）",
      prop: "orderDate",
    },
    {
      type: "input",
      attrs: {
        placeholder: "记录创建人（用户ID）"
      },
      rules: [{ required: true, message: "记录创建人（用户ID）不能为空", trigger: "blur" }],
      label: "记录创建人（用户ID）",
      prop: "createBy",
    },
    {
      type: "input",
      attrs: {
        placeholder: "记录创建时间"
      },
      rules: [{ required: true, message: "记录创建时间不能为空", trigger: "blur" }],
      label: "记录创建时间",
      prop: "createTime",
    },
    {
      type: "input",
      attrs: {
        placeholder: "记录最后修改人"
      },
      label: "记录最后修改人",
      prop: "updateBy",
    },
    {
      type: "input",
      attrs: {
        placeholder: "记录最后修改时间"
      },
      rules: [{ required: true, message: "记录最后修改时间不能为空", trigger: "blur" }],
      label: "记录最后修改时间",
      prop: "updateTime",
    },
  ],
  // 提交函数
  formAction: (data: BizOrdersForm) => {
    if (data.id) {
      // 编辑
      return BizOrdersAPI.update(data.id as string, data);
    } else {
      // 新增
      return BizOrdersAPI.create(data);
    }
  },
});

// 编辑配置
const editModalConfig: IModalConfig<BizOrdersForm> = reactive({
  permPrefix: "orders:biz-orders",
  component: "drawer",
  drawer: {
    title: "编辑",
    size: 500,
  },
  pk: "id",
  formAction(data: any) {
    return BizOrdersAPI.update(data.id as string, data);
  },
  formItems: addModalConfig.formItems, // 复用新增的表单项
});

// 处理操作按钮点击
const handleOperateClick = (data: IObject) => {
  if (data.name === "edit") {
    handleEditClick(data.row, async () => {
      return await BizOrdersAPI.getFormData(data.row.id);
    });
  }
};

// 处理工具栏按钮点击（删除等）
const handleToolbarClick = (name: string) => {
  console.log(name);
};

</script>
