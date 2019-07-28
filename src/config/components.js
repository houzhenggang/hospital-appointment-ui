import Vue from 'vue'
// import basicContainer from "@/components/basic-container/main"
import basicContainer from '@/components/layout/index'
import scmLayoutBody from '@/components/layout/layout-body'
import scmLayoutHeader from '@/components/layout/layout-header'
import scmLayoutButtonGroup from '@/components/layout/layout-button-group'
import scmButton from '@/components/scm-button'
import scmDialog from '@/components/scm-dialog'
import scmSearchBar from '@/components/scm-search-bar'
import scmFormDetail from '@/components/scm-form-detail'

const components = [
  basicContainer,
  scmLayoutBody,
  scmLayoutHeader,
  scmLayoutButtonGroup,
  scmButton,
  scmDialog,
  scmSearchBar,
  scmFormDetail
]

components.forEach(component => {
  Vue.component(component.name, component)
})

export default Vue
