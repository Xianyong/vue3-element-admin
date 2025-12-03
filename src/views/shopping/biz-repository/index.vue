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
defineOptions({ name: "BizRepository" });

import BizRepositoryAPI, { BizRepositoryForm, BizRepositoryPageQuery } from "@/api/repository/biz-repository-api";
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
  permPrefix: "repository:biz-repository",
  formItems: [
  ],
});

// 列表配置
const contentConfig: IContentConfig<BizRepositoryPageQuery> = reactive({
  // 权限前缀
  permPrefix: "repository:biz-repository",
  table: {
    border: true,
    highlightCurrentRow: true,
  },
  // 主键
  pk: "id",
  // 列表查询接口
  indexAction: BizRepositoryAPI.getPage,
  // 删除接口
  deleteAction: BizRepositoryAPI.deleteByIds,
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
    { label: "关系记录唯一标识符", prop: "id" },
    { label: "部门ID，外键关联部门表", prop: "departmentId" },
    { label: "产品ID，外键关联产品表", prop: "productId" },
    { label: "当前库存数量", prop: "currentQuantity" },
    { label: "累计订购数量", prop: "orderQuantityTotal" },
    { label: "最近订购日期", prop: "orderDateLatest" },
    { label: "记录创建时间", prop: "createTime" },
    { label: "记录最后更新时间", prop: "updateTime" },
    { label: "", prop: "createBy" },
    { label: "", prop: "updateBy" },
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
const addModalConfig: IModalConfig<BizRepositoryForm> = reactive({
  // 权限前缀
  permPrefix: "repository:biz-repository",
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
        placeholder: "关系记录唯一标识符"
      },
      rules: [{ required: true, message: "关系记录唯一标识符不能为空", trigger: "blur" }],
      label: "关系记录唯一标识符",
      prop: "id",
    },
    {
      type: "input",
      attrs: {
        placeholder: "部门ID，外键关联部门表"
      },
      rules: [{ required: true, message: "部门ID，外键关联部门表不能为空", trigger: "blur" }],
      label: "部门ID，外键关联部门表",
      prop: "departmentId",
    },
    {
      type: "input",
      attrs: {
        placeholder: "产品ID，外键关联产品表"
      },
      rules: [{ required: true, message: "产品ID，外键关联产品表不能为空", trigger: "blur" }],
      label: "产品ID，外键关联产品表",
      prop: "productId",
    },
    {
      type: "input",
      attrs: {
        placeholder: "当前库存数量"
      },
      rules: [{ required: true, message: "当前库存数量不能为空", trigger: "blur" }],
      label: "当前库存数量",
      prop: "currentQuantity",
    },
    {
      type: "input",
      attrs: {
        placeholder: "累计订购数量"
      },
      label: "累计订购数量",
      prop: "orderQuantityTotal",
    },
    {
      type: "input",
      attrs: {
        placeholder: "最近订购日期"
      },
      label: "最近订购日期",
      prop: "orderDateLatest",
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
        placeholder: "记录最后更新时间"
      },
      rules: [{ required: true, message: "记录最后更新时间不能为空", trigger: "blur" }],
      label: "记录最后更新时间",
      prop: "updateTime",
    },
    {
      type: "input",
      attrs: {
        placeholder: ""
      },
      label: "",
      prop: "createBy",
    },
    {
      type: "input",
      attrs: {
        placeholder: ""
      },
      label: "",
      prop: "updateBy",
    },
  ],
  // 提交函数
  formAction: (data: BizRepositoryForm) => {
    if (data.id) {
      // 编辑
      return BizRepositoryAPI.update(data.id as string, data);
    } else {
      // 新增
      return BizRepositoryAPI.create(data);
    }
  },
});

// 编辑配置
const editModalConfig: IModalConfig<BizRepositoryForm> = reactive({
  permPrefix: "repository:biz-repository",
  component: "drawer",
  drawer: {
    title: "编辑",
    size: 500,
  },
  pk: "id",
  formAction(data: any) {
    return BizRepositoryAPI.update(data.id as string, data);
  },
  formItems: addModalConfig.formItems, // 复用新增的表单项
});

// 处理操作按钮点击
const handleOperateClick = (data: IObject) => {
  if (data.name === "edit") {
    handleEditClick(data.row, async () => {
      return await BizRepositoryAPI.getFormData(data.row.id);
    });
  }
};

// 处理工具栏按钮点击（删除等）
const handleToolbarClick = (name: string) => {
  console.log(name);
};

</script>
