import React from 'react'
import PropTypes from 'prop-types'
import { Container, Content, Text } from './styled'
import { Table } from '../Table'
import { Section } from '../Table/styled'

export const Margins = ({ data, dataProducts }) => {
  return (
        <Container>
            <Text margin="30px 0px 30px" size="20px">
                Registered Invoices
            </Text>
            <Text margin="30px 0px 30px" size="20px">
                numero de bills en la compañia {data?.length}
            </Text>
            <Table
                titles={[
                  { name: '#', width: 'min-content' },
                  { name: 'Products id', width: '1fr' },
                  { name: 'Total cost', width: '1fr' }
                ]}
                bgRow={2}
                pointer
                labelBtn="Bills"
                entryPerView
                //   handleAdd={() => isSettingModal()}
                data={data?.filter(x => x.bDescription !== 0 && x)}
                renderBody={(dataB, titles) =>
                  dataB?.map((elem, i) => (
                        <Section columnWidth={titles} key={i}>
                            <Content>
                                <Text>{i + 1}</Text>
                            </Content>
                            <Content>
                                {/* <Text> {elem.bInvoiceRef}</Text> */}
                            </Content>
                            <Content>
                                {/* <Text> {elem.lineItems[1].idPro}</Text> */}
                            </Content>
                        </Section>
                  ))
                }
            />
        </Container>
  )
}

Margins.propTypes = {
  data: PropTypes.array,
  dataProducts: PropTypes.array
}
