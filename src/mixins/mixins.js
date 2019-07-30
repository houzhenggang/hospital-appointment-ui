import { getDict } from "@/util/util"

export default {
  data () {
    return {
      // 分页
      pagination: {
        currentPage: 1, // 当前页码
        pageSize: 10, // 显示多少条
        total: 0, // 总条数
        pageSizes: [10, 20, 30, 40, 50],
      },
      // 搜索参数
      listQuery: {},
      // 列表多选数据
      queryData: [],
      tableLoading: false,
    }
  },
  watch: {
    "pagination.currentPage": {
      handler (newVal) {
        this.listQuery.current = newVal
      },
      deep: true,
      immediate: true,
    },
    "pagination.pageSize": {
      handler (newVal) {
        this.listQuery.size = newVal
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    // 列表
    getList () {
      this.tableLoading = true
    },
    // 列表搜索
    handleFilter () {
      for (const key in this.listQuery) {
        if (this.listQuery[key] === "") {
          this.listQuery[key] = undefined
        }
      }
      this.pagination.currentPage = 1
      this.$nextTick(() => {
        this.getList()
      })
    },
    // 分页显示个数
    sizeChange (val) {
      this.pagination.currentPage = 1
      this.pagination.pageSize = val
      setTimeout(() => {
        this.getList()
      }, 10)
    },
    // 分页当前页
    currentChange (val) {
      this.pagination.currentPage = val
      setTimeout(() => {
        this.getList()
      }, 10)
    },
    // 多选
    selectionChange (val, prop) {
      this.queryData = val.map((item) => {
        return item[prop || "id"]
      })
    },
    getDict(name) {
      return getDict(name)
    }
  },
  created () {
    this.getList()
  },
}