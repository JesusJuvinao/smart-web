import React, { useContext } from 'react'
import { Table } from '../../components/Table'
import { Section } from '../../components/Table/styled'
import { Context } from '../../context'
import Link from 'next/link'
import ReactExport from 'react-data-export'
import { Button, Container, Content, Text } from './styled'

const ExcelFile = ReactExport.ExcelFile
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn

export const Excel = () => {
  const { setAlertBox, handleMenu, company } = useContext(Context)
  return (<Container>
    <ExcelFile element={<button>Descargar Datos</button>}>
      <ExcelSheet data={[1, 2, 3]} name='Employees'>
        <ExcelColumn label="N° DOCUMENTO" value="document" />
        <ExcelColumn label="NOMBRES" value="name" />
        <ExcelColumn label="CONTRATO" value="contract" />
        <ExcelColumn label="ESTADO" value={col => col.state ? 'ACTIVO' : 'RETIRADO'} />
        {[1, 2, 3].map(x => <ExcelColumn key={x.rId} label={x.rName} value={x.rId} />)}
      </ExcelSheet>
    </ExcelFile>
  </Container>
  )
}
