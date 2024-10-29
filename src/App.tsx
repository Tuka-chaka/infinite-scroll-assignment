import styles from'./App.module.css'
import EntryList from './components/entryList/EntryList'
import Controls from './components/controls/Controls'
import { FloatButton } from 'antd';

function App() {

  return (
    <div className={styles.app}>
      <Controls/>
      <EntryList/>
      <FloatButton.BackTop/>
    </div>
  )
}

export default App
