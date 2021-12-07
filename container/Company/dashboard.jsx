import React from 'react'
import PropTypes from 'prop-types'
import { BColor } from '../../public/colors'
import { Container, Text, Card, ContainerCard } from './styled'
import { RippleButton } from '../../components/Ripple'
import { useSetState } from '../../components/hooks/useState'
import { useCompanyHook } from '../dashboard'
import { useQuery } from '@apollo/client'
import { ALL_COMPANIES_BY_USER } from './queries'
import styled from 'styled-components'
import { Skeleton } from '../../components/Loading/skeleton'

export const CompaniesDashboard = () => {
  const active = useSetState(1)
  const handleClick = index => {
    active.setState(index === active.state ? true : index)
  }

  return (<Container>
        <ContainerCard direction='row' wrap='no-wrap' justify='space-between' width='100%'>
            <div>
                <RippleButton margin='0px 10px 0px 0px' border='60px' color={BColor} widthButton='150px' bgColor={'#e2e8f0'} family='PFont-Regular' onClick={() => active.state !== 1 && handleClick(1)}>
                    ViewInfo
                </RippleButton>
                <RippleButton margin='0px 10px 0px 0px' border='60px' color={BColor} widthButton='150px' bgColor={'#e2e8f0'} family='PFont-Regular' onClick={() => active.state !== 2 && handleClick(2)}>
                    ViewInfo
                </RippleButton>
                <RippleButton margin='0px 10px 0px 0px' border='60px' color={BColor} widthButton='150px' bgColor={'#e2e8f0'} family='PFont-Regular' onClick={() => active.state !== 3 && handleClick(3)}>
                    Generate Report
                </RippleButton>
                <RippleButton margin='0px 10px 0px 0px' border='60px' color={BColor} widthButton='150px' bgColor={'#e2e8f0'} family='PFont-Regular' onClick={() => active.state !== 4 && handleClick(4)}>
                    Generate Report
                </RippleButton>
                <RippleButton margin='0px 10px 0px 0px' border='60px' color={BColor} widthButton='150px' bgColor={'#e2e8f0'} family='PFont-Regular' onClick={() => active.state !== 5 && handleClick(5)}>
                    Generate Report
                </RippleButton>
                <RippleButton margin='0px 10px 0px 0px' border='60px' color={BColor} widthButton='150px' bgColor={'#e2e8f0'} family='PFont-Regular' onClick={() => active.state !== 6 && handleClick(6)}>
                    Generate Report
                </RippleButton>
            </div>
        </ContainerCard>
        {active.state === 1 ? <ViewReportsByCompany /> : active.state === 2 ? <InviteUsers /> : active.state === 3 ? <UpdateInfo /> : active.state === 4 ? <ViewLitsCompany /> : active.state === 5 ? <div>5</div> : <div>6</div>}
    </Container>
  )
}

const InviteUsers = () => {
  const { data: allCompany } = useQuery(ALL_COMPANIES_BY_USER)
  return (
        <>
            <ContainerCard>
                <Text margin='30px 0' size='2.5rem' font='PFont-Bold' color={BColor}>Invite</Text>
            </ContainerCard>
            <ContainerCard >{allCompany?.getAllCompanyById
              ? allCompany?.getAllCompanyById?.map((x) => (
                    <Card margin='0 10px 0 0' height='150px' width='20%' key={x._id} hover>
                        <Text size='15px' >{x.companyName}</Text>
                        <Text size='11px' >{x.accounts}</Text>
                        <Text size='11px' >{x.companyLegalStatus}</Text>
                        <Text size='11px' >{x.dissolvedOn}</Text>
                        <Text size='11px' >{x.incorporatedOn}</Text>
                        <Text size='11px' >{x.natureOfBusiness}</Text>
                        <Text size='11px' >{x.registeredOfficeAddress}</Text>
                    </Card>
              ))
              : <ContainerCard> <Skeleton margin='0 10px 0 0' height='300px' width='20%' /></ContainerCard> }
            </ContainerCard>
        </>
  )
}
const UpdateInfo = () => {
  return (
        <div>
            <ContainerCard>
                <Text margin='30px 0' size='2.5rem' font='PFont-Bold' color={BColor}>Update</Text>
            </ContainerCard>
            <ContainerCard>
                <Card margin='0 10px 0 0' height='150px' width='20%' >
                    <Text margin='0' size='12px' font='PFont-Bold'>Change Name</Text>
                </Card>
                <Card margin='0 10px 0 0' height='150px' width='20%' >
                    <Text margin='0' size='12px' font='PFont-Bold'>My Employees</Text>
                </Card>
                <Card margin='0 10px 0 0' height='150px' width='20%' >
                    <Text margin='0' size='12px' font='PFont-Bold'>My Employees</Text>
                </Card>
                <Card margin='0 10px 0 0' height='150px' width='20%' >
                    <Text margin='0' size='12px' font='PFont-Bold'>My Employees</Text>
                </Card>
            </ContainerCard>
        </div>
  )
}
const ViewLitsCompany = () => {
  return (
        <div>
            <ContainerCard>
                <Text margin='30px 0' size='2.5rem' font='PFont-Bold' color={BColor}>List Company</Text>
            </ContainerCard>
            <ContainerCard>
                <Card margin='0 10px 0 0' height='150px' width='20%' >IM CARD</Card>
                <Card margin='0 10px 0 0' height='150px' width='20%' >IM CARD</Card>
                <Card margin='0 10px 0 0' height='150px' width='20%' >IM CARD</Card>
                <Card margin='0 10px 0 0' height='150px' width='20%' >IM CARD</Card>
            </ContainerCard>
        </div>
  )
}
const ViewReportsByCompany = () => {
  const [dataCompany] = useCompanyHook()
  return (
        <div>
            <ContainerCard>
                <Text margin='30px 0' size='2.5rem' font='PFont-Bold' color={BColor}>Admin {dataCompany?.companyName}</Text>
                <Text size='12px' font='PFont-Bold' color={BColor}>dataCompany: {dataCompany?.companyType}</Text>
                <Text size='12px' font='PFont-Bold' color={BColor}>dissolvedOn: {dataCompany?.dissolvedOn}</Text>
                <Text size='12px' font='PFont-Bold' color={BColor}>incorporatedOn: {dataCompany?.incorporatedOn}</Text>
                <Text size='12px' font='PFont-Bold' color={BColor}>registeredOfficeAddress: {dataCompany?.registeredOfficeAddress}</Text>
                <Text size='12px' font='PFont-Bold' color={BColor}>natureOfBusiness: {dataCompany?.natureOfBusiness}</Text>
                <Text size='12px' font='PFont-Bold' color={BColor}>companyLegalStatus: {dataCompany?.companyLegalStatus}</Text>
            </ContainerCard>

            <ContainerCard>
                <Card margin='0 10px 0 0' height='150px' width='20%' >IM CARD</Card>
                <Card margin='0 10px 0 0' height='150px' width='20%' >IM CARD</Card>
                <Card margin='0 10px 0 0' height='150px' width='20%' >IM CARD</Card>
                <Card margin='0 10px 0 0' height='150px' width='20%' >IM CARD</Card>
            </ContainerCard>
            <ContainerCard>
                <Card margin='0 10px 0 0' height='150px' width='70%' >IM CARD</Card>
                <Card margin='0 10px 0 0' height='150px' width='20%' >IM CARD</Card>
            </ContainerCard>
            <ContainerCard>
                <Card margin='0 10px 0 0' height='150px' width='20%' >IM CARD</Card>
                <Card margin='0 10px 0 0' height='150px' width='70%' >IM CARD</Card>
            </ContainerCard>
            <ContainerCard>
                <Card margin='0 10px 0 0' height='150px' width='30%' >
                <Text margin='0' size='1em' font='PFont-Regular'>Transaction History</Text>

                </Card>
                <Card margin='0 10px 0 0' height='150px' width='30%' >
                <Text margin='0' size='1em' font='PFont-Regular'>New Customers</Text>

                </Card>
                <Card margin='0 10px 0 0' height='150px' width='30%' >
                <Text margin='0' size='1em' font='PFont-Regular'>Real-Time Sales</Text>

                </Card>
            </ContainerCard>
        </div>
  )
}

export const LoaderSk = () => {
  return (
        <div>
            <LoaderSkeleton>
                <div className="card-loader"></div>
            </LoaderSkeleton>

        </div>
  )
}

const LoaderSkeleton = styled.div`
z-index: 999;
.card-loader {
background-color: #fff;
padding: 8px;
position: relative;
margin-bottom: 50px;
height: 200px;
overflow: hidden;
/* padding: 10px; */
&:before {
content: '';
height: 120px;
display: flex;
background-color: #ededed;
border-radius: 6px;
box-shadow: -48px 78px 0 -48px #ededed, -51px 102px 0 -51px #ededed;
}

&:after {
content: '';
background-color: #636363;
border-radius: 10px;
width: 100%;
height: 200px;
position: absolute;
top: 0;
left: 0;
animation-duration: .8s;
animation-iteration-count: infinite;
animation-name: loader-animate;
animation-timing-function: linear;
background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.6) 30%, rgba(255,255,255,0) 81%);
}

}


// Loader animation
@keyframes loader-animate{
0%{
transform: translate3d(-100%, 0, 0);
}
100%{
transform: translate3d(100%, 0, 0);
}
}
`

CompaniesDashboard.propTypes = {

}
