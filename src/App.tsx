import styles from'./App.module.css'
import EntryList from './components/entryList/EntryList'

function App() {

  return (
    <div className={styles.app}>
      <EntryList/>
    </div>
  )
}

export default App
