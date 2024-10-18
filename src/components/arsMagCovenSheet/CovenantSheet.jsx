import { useState } from 'react'
import { ThemeProvider, CssBaseline } from '@mui/material'

import { sheetThemeAM } from '../themeAndStyles'

import {
  PageOne,
  PageTwo,
  PageThree,
  PageFour,
} from './CovenantMain/CovenantMain'
import LibraryRecordSheet from './LibraryRecordSheet/LibraryRecordSheet'
import Laboratories from './Laboratories/Laboratories'
import VisRecordSheet from './VisRecordSheet/VisRecordSheet'
import YearlySummarySheet from './YearlySummarySheet/YearlySummarySheet'
import Header from '../Header'

const headerData = {
  title: 'Covenant Records',
  sections: [
    { name: 'main', alt: 'main' },
    { name: 'library', alt: 'library' },
    { name: 'vis records', alt: 'vis' },
    { name: 'laboratories', alt: 'labs' },
    { name: 'yearly summaries', alt: 'years' },
  ],
}

const CovenantSheet = ({ covenantId }) => {
  if (!covenantId) return
  const [page, setPage] = useState('main')
  const toPage = (page) => () => {
    setPage(page)
  }

  const content = () => {
    if (page === 'main') {
      return (
        <>
          <PageOne covenantId={covenantId} />
          <PageTwo covenantId={covenantId} />
          <PageThree covenantId={covenantId} />
          <PageFour covenantId={covenantId} />
        </>
      )
    } else if (page === 'library') {
      return <LibraryRecordSheet covenantId={covenantId} />
    } else if (page === 'laboratories') {
      return <Laboratories covenantId={covenantId} />
    } else if (page === 'vis records') {
      return <VisRecordSheet covenantId={covenantId} />
    } else if (page === 'yearly summaries') {
      return <YearlySummarySheet covenantId={covenantId} />
    }
  }
  return (
    <>
      <Header toPage={toPage} headerData={headerData} />
      <ThemeProvider theme={sheetThemeAM}>
        <CssBaseline />
        {content()}
      </ThemeProvider>
    </>
  )
}
export default CovenantSheet
