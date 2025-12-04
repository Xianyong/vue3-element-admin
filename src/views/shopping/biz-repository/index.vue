<template>
  <div class="app-container h-full flex flex-1 flex-col">
    <!-- 搜索 -->
    <page-search
      ref="searchRef"
      :search-config="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    ></page-search>

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
    ></page-content>

    <!-- 新增 -->
    <page-modal
      ref="addModalRef"
      :modal-config="addModalConfig"
      @submit-click="handleSubmitClick"
    ></page-modal>

    <!-- 编辑 -->
    <page-modal
      ref="editModalRef"
      :modal-config="editModalConfig"
      @submit-click="handleSubmitClick"
    ></page-modal>
    <!-- 购物 -->
    <page-modal
      ref="shoppingModalRef"
      :modal-config="shoppingModalConfig"
      @submit-click="handleShoppingSubmit"
    ></page-modal>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "BizRepository" });

import BizRepositoryAPI, {
  BizRepositoryForm,
  BizRepositoryPageQuery,
} from "@/api/repository/biz-repository-api";
import type { IObject, IModalConfig, IContentConfig, ISearchConfig } from "@/components/CURD/types";
import usePage from "@/components/CURD/usePage";
import { hasPerm } from "@/utils/auth";

// 组合式 CRUD
const {
  searchRef,
  contentRef,
  addModalRef,
  editModalRef,
  shoppingModalRef,
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
    {
      tips: "支持模糊搜索",
      type: "input",
      label: "商品名称",
      prop: "productName",
      attrs: {
        placeholder: "商品名称（如：XX品牌 18.9L 桶装纯净水）",
        clearable: true,
        style: { width: "400px" },
      },
    },
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
    { label: "关系记录唯一标识符", prop: "id", show: false },
    { label: "站点名称", prop: "departmentName" },
    { label: "产品名称", prop: "productName" },
    { label: "当前库存数量", prop: "currentQuantity" },
    { label: "最近订购日期", prop: "orderDateLatest" },
    { label: "累计入库数量", prop: "orderQuantityTotal" },
    { label: "记录创建时间", prop: "createTime", show: false },
    { label: "记录最后更新时间", prop: "updateTime", show: false },
    { label: "", prop: "createBy", show: false },
    { label: "", prop: "updateBy", show: false },
    {
      label: "操作",
      prop: "operation",
      width: 220,
      templet: "tool",
      operat: [
        "edit",
        "delete",
        {
          name: "repository_buy",
          text: "购买",
          perm: "repository:biz-repository:buy",
          attrs: {
            icon: "refresh-left",
            // color: "#626AEF", // 使用 text 属性，颜色不生效
            style: {
              "--el-button-text-color": "#626AEF",
              "--el-button-hover-link-text-color": "#9197f4",
            },
          },
        },
      ],
      show:
        hasPerm("repository:biz-repository:edit") ||
        hasPerm("repository:biz-repository:delete") ||
        hasPerm("repository:biz-repository:buy"),
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
    // {
    //   type: "input",
    //   attrs: {
    //     placeholder: "关系记录唯一标识符",
    //   },
    //   rules: [{ required: true, message: "关系记录唯一标识符不能为空", trigger: "blur" }],
    //   label: "关系记录唯一标识符",
    //   prop: "id",
    //   show: () => false,
    // },
    {
      type: "input",
      attrs: {
        placeholder: "当前库存数量",
      },
      rules: [{ required: true, message: "当前库存数量不能为空", trigger: "blur" }],
      label: "当前库存数量",
      prop: "currentQuantity",
    },
    {
      type: "input",
      attrs: {
        placeholder: "累计订购数量",
      },
      rules: [{ required: true, message: "累计库存数量不能为空", trigger: "blur" }],
      label: "累计订购数量",
      prop: "orderQuantityTotal",
    },
    {
      type: "input",
      attrs: {
        placeholder: "最近订购日期",
      },
      label: "最近订购日期",
      prop: "orderDateLatest",
    },
  ],
  // 提交函数
  formAction: (data: BizRepositoryForm) => {
    if (data.id) {
      // 编辑
      // console.log("formAction data11:", data);
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
    // console.log("formAction data22:", data.id, data);
    return BizRepositoryAPI.update(data.id as string, data);
  },
  formItems: addModalConfig.formItems, // 复用新增的表单项
});
// 购物配置
const shoppingModalConfig: IModalConfig = reactive({
  permPrefix: "repository:biz-repository",
  component: "dialog",
  dialog: {
    title: "购物",
    width: 500,
    draggable: true,
  },
  form: {
    labelWidth: 100,
  },
  formItems: [
    {
      type: "input",
      attrs: {
        placeholder: "商品名称",
        disabled: true,
      },
      label: "商品名称",
      prop: "productName",
    },
    {
      type: "input-number",
      attrs: {
        placeholder: "购买数量",
        min: 1,
      },
      label: "购买数量",
      prop: "quantity",
      rules: [{ required: true, message: "请输入购买数量", trigger: "blur" }],
    },
  ],
  formAction: (data: any) => {
    // 这里添加购物逻辑
    console.log("购买商品:", data.productName, "数量:", data.quantity);
    return Promise.resolve();
  },
});
// 处理操作按钮点击
const handleOperateClick = (data: IObject) => {
  if (data.name === "edit") {
    handleEditClick(data.row, async () => {
      return await BizRepositoryAPI.getFormData(data.row.id);
    });
  } else if (data.name === "repository_buy") {
    // 处理购物按钮点击
    const shoppingData = {
      productName: data.row.productName,
      quantity: 1, // 默认数量为1
    };
    shoppingModalRef.value?.setModalVisible(true);
    shoppingModalRef.value?.setFormData(shoppingData);
  }
};

// 处理购物提交
const handleShoppingSubmit = (data: any) => {
  console.log("购买商品:", data.productName, "数量:", data.quantity);
  // 在这里实现实际的购物逻辑
  shoppingModalRef.value?.setModalVisible(false);
};

// 处理工具栏按钮点击（删除等）
const handleToolbarClick = (name: string) => {
  console.log(name);
};
</script>
