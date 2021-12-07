import styled from 'styled-components'
import PropTypes from 'prop-types'
import Image from 'next/image'
import { Button, Container, Text, Content, HeadTitle, Section, Table, Card, ContentInnerDates } from './styled'
export const PdfC = () => {
  const data = [
    {
user: {
        issuer: 'did:ethr:0x59f872a2070Ade3E12a6422F0ea64b7833FD862F',
        publicAddress: '0x59f872a2070Ade3E12a6422F0ea64b7833FD862F',
        email: 'stuart.wilson@smartaccountingonline.com',
        oauthProvider: null
      }
    },
    {
      NumTixSold: 26,
      totalSalesForEvent: '1619.00',
      eventData: {
        eventType: 'Non-TOMS',
        eventRef: 'MCR0034327',
        eventName: "Hilton Manchester New Year's Eve Gala Ball",
        eventCommencesDate: '31/12/2018',
        eventCommencesTime: '19:00',
        eventFinishesDate: '01/01/2019',
        eventFinishesTime: '01:00',
        eventStatus: 'Active',
        eventOwner: 'Spice Manchester',
        eventAddress1: 'Hilton Manchester Deansgate',
        eventAddress2: '303 Deansgate',
        eventAddress3: null,
        eventTown: 'Manchester',
        eventCounty: 'Greater Manchester',
        eventCountry: null,
        eventPostCode: 'M3 4LQ',
        eventMaxQuantity: '30',
        eventCurrentAvailQuantity: '1',
        eventCurrentSold: '29',
        eventLastUpdatedDate: '31/12/2018',
        eventLastUpdatedTime: '12:29',
        eventCancelledPolicy: 'Ticketed Events'
      },

      AdjustmentsListing: [
        {
          id: 'X9Z-AIMa-8xC3P3mma8gD',
          type: 'COST_ADJUSTMENT',
          isApprovedByEventOwner: 'No',
          bookingRef: 'MCR0382053',
          bookedOn: '07/12/2018 15:33',
          client: 'Andy Dearden',
          ticketoption: 'Guest',
          ticketquantity: 1,
          ticketprice: '79.00',
          totaldue: 134,
          totaldueCalc: '79.00',
          totalpaid: 134,
          balancedue: 0,
          agentCode: 'Spice Manchester',
          clientOwnerAtPurchase: 'Spice Manchester',
          bookingStatus: 'Booked',
          eventName: "Hilton Manchester New Year's Eve Gala Ball",
          eventOwner: 'Spice Manchester',
          eventCommences: '31/12/2018 19:00',
          diffinAmountsDue: '55.00'
        },
        {
          id: 'PkkGzyokmMLSp751lvlIr',
          type: 'COST_ADJUSTMENT',
          isApprovedByEventOwner: 'No',
          bookingRef: 'MCR0382053',
          bookedOn: '07/12/2018 15:33',
          client: 'Andy Dearden',
          ticketoption: 'Member',
          ticketquantity: 1,
          ticketprice: '55.00',
          totaldue: 134,
          totaldueCalc: '55.00',
          totalpaid: 134,
          balancedue: 0,
          agentCode: 'Spice Manchester',
          clientOwnerAtPurchase: 'Spice Manchester',
          bookingStatus: 'Booked',
          eventName: "Hilton Manchester New Year's Eve Gala Ball",
          eventOwner: 'Spice Manchester',
          eventCommences: '31/12/2018 19:00',
          diffinAmountsDue: '79.00'
        },
        {
          id: 'JR8xE-MbxWm38kBZ-zczh',
          type: 'COST_ADJUSTMENT',
          isApprovedByEventOwner: 'No',
          bookingRef: 'MCR0381525',
          bookedOn: '02/11/2018 13:10',
          client: 'John Weatherbed',
          ticketoption: 'Member',
          ticketquantity: 1,
          ticketprice: '55.00',
          totaldue: 0,
          totaldueCalc: '55.00',
          totalpaid: 0,
          balancedue: 0,
          agentCode: 'Spice Manchester',
          clientOwnerAtPurchase: 'Spice Manchester',
          bookingStatus: 'Booked',
          eventName: "Hilton Manchester New Year's Eve Gala Ball",
          eventOwner: 'Spice Manchester',
          eventCommences: '31/12/2018 19:00',
          diffinAmountsDue: '-55.00'
        }
      ],
      AgentCommCalcs: [
        {
          Id: 'Member',
          totaldueCalc: 275,
          totalCommission: 13.75,
          totalTicketsSold: 5,
          ticketprice: 55,
          commmissionRate: 5,
          clientOwnerAtPurchaseDate: 'Spice Yorkshire',
          eventName: "Hilton Manchester New Year's Eve Gala Ball",
          eventOwner: 'Spice Manchester',
          eventCommences: '31/12/2018 19:00'
        }
      ],
      commissionInvoices: [
        {
          'Spice Yorkshire': {
            Id: 'Member',
            totaldueCalc: 275,
            totalCommission: 13.75,
            totalTicketsSold: 5,
            ticketprice: 55,
            commmissionRate: 5,
            clientOwnerAtPurchaseDate: 'Spice Yorkshire',
            eventName: "Hilton Manchester New Year's Eve Gala Ball",
            eventOwner: 'Spice Manchester',
            eventCommences: '31/12/2018 19:00'
          }
        }
      ],
      ticketPurchases: [
        {
          id: '6VSacLJPQS07ZfsMIM4On',
          bookingRef: 'YRK0330923',
          bookedOn: '12/11/2018 14:07',
          client: 'Jonathan Kirkland',
          ticketoption: 'Member',
          ticketquantity: 1,
          ticketprice: 55,
          totaldue: 55,
          totaldueCalc: 55,
          totalpaid: 55,
          balancedue: 0,
          commissionRatePercent: 5,
          commissionpayable: 2.75,
          agentCode: 'Spice Yorkshire',
          clientOwnerAtPurchaseDate: 'Spice Yorkshire',
          bookingStatus: 'Booked',
          eventName: "Hilton Manchester New Year's Eve Gala Ball",
          eventOwner: 'Spice Manchester',
          eventCommences: '31/12/2018 19:00'
        },
        {
          id: 'IlOybCGscIcWE6pouFwa4',
          bookingRef: 'MCR0382123',
          bookedOn: '13/12/2018 22:20',
          client: 'Jeannette Robson',
          ticketoption: 'Member',
          ticketquantity: 1,
          ticketprice: 55,
          totaldue: 55,
          totaldueCalc: 55,
          totalpaid: 55,
          balancedue: 0,
          commissionRatePercent: 5,
          commissionpayable: 2.75,
          agentCode: 'Spice Manchester',
          clientOwnerAtPurchaseDate: 'Spice Manchester',
          bookingStatus: 'Booked',
          eventName: "Hilton Manchester New Year's Eve Gala Ball",
          eventOwner: 'Spice Manchester',
          eventCommences: '31/12/2018 19:00'
        },
        {
          id: 'G5qvgIdmN1JtR_FLE2yxw',
          bookingRef: 'YRK0331303',
          bookedOn: '15/12/2018 22:18',
          client: 'Helen Jatzuk',
          ticketoption: 'Member',
          ticketquantity: 2,
          ticketprice: 55,
          totaldue: 110,
          totaldueCalc: 110,
          totalpaid: 110,
          balancedue: 0,
          commissionRatePercent: 5,
          commissionpayable: 5.5,
          agentCode: 'Spice Yorkshire',
          clientOwnerAtPurchaseDate: 'Spice Yorkshire',
          bookingStatus: 'Booked',
          eventName: "Hilton Manchester New Year's Eve Gala Ball",
          eventOwner: 'Spice Manchester',
          eventCommences: '31/12/2018 19:00'
        },
        {
          id: 'WSm1zEqVbafN1cR0QPqX-',
          bookingRef: 'MCR0381774',
          bookedOn: '16/11/2018 14:51',
          client: 'Andy Withers',
          ticketoption: 'Member',
          ticketquantity: 1,
          ticketprice: 55,
          totaldue: 55,
          totaldueCalc: 55,
          totalpaid: 55,
          balancedue: 0,
          commissionRatePercent: 5,
          commissionpayable: 2.75,
          agentCode: 'Spice Manchester',
          clientOwnerAtPurchaseDate: 'Spice Manchester',
          bookingStatus: 'Booked',
          eventName: "Hilton Manchester New Year's Eve Gala Ball",
          eventOwner: 'Spice Manchester',
          eventCommences: '31/12/2018 19:00'
        },
        {
          id: 'og0fI0HV2s7h3uj8eat82',
          bookingRef: 'MCR0381766',
          bookedOn: '16/11/2018 12:09',
          client: 'Bridget Ramage',
          ticketoption: 'Member',
          ticketquantity: 1,
          ticketprice: 55,
          totaldue: 55,
          totaldueCalc: 55,
          totalpaid: 55,
          balancedue: 0,
          commissionRatePercent: 5,
          commissionpayable: 2.75,
          agentCode: 'Spice Manchester',
          clientOwnerAtPurchaseDate: 'Spice Manchester',
          bookingStatus: 'Booked',
          eventName: "Hilton Manchester New Year's Eve Gala Ball",
          eventOwner: 'Spice Manchester',
          eventCommences: '31/12/2018 19:00'
        },
        {
          id: 'sK-JVMDiogb0MtbIrsYDI',
          bookingRef: 'MCR0382157',
          bookedOn: '18/12/2018 22:55',
          client: 'Caroline Ainsworth',
          ticketoption: 'Member',
          ticketquantity: 1,
          ticketprice: 55,
          totaldue: 55,
          totaldueCalc: 55,
          totalpaid: 55,
          balancedue: 0,
          commissionRatePercent: 5,
          commissionpayable: 2.75,
          agentCode: 'Spice Manchester',
          clientOwnerAtPurchaseDate: 'Spice Manchester',
          bookingStatus: 'Booked',
          eventName: "Hilton Manchester New Year's Eve Gala Ball",
          eventOwner: 'Spice Manchester',
          eventCommences: '31/12/2018 19:00'
        },
        {
          id: '1puAGTA5fKTBrs7T8Zodk',
          bookingRef: 'MCR0382155',
          bookedOn: '18/12/2018 15:31',
          client: 'Philip Carr',
          ticketoption: 'Member',
          ticketquantity: 1,
          ticketprice: 55,
          totaldue: 55,
          totaldueCalc: 55,
          totalpaid: 55,
          balancedue: 0,
          commissionRatePercent: 5,
          commissionpayable: 2.75,
          agentCode: 'Spice Manchester',
          clientOwnerAtPurchaseDate: 'Spice Manchester',
          bookingStatus: 'Booked',
          eventName: "Hilton Manchester New Year's Eve Gala Ball",
          eventOwner: 'Spice Manchester',
          eventCommences: '31/12/2018 19:00'
        },
        {
          id: '0kqVHvtBFC2f8_ODQNpKA',
          bookingRef: 'MCR0381835',
          bookedOn: '21/11/2018 10:21',
          client: 'Robert Haddy',
          ticketoption: 'Member',
          ticketquantity: 1,
          ticketprice: 55,
          totaldue: 55,
          totaldueCalc: 55,
          totalpaid: 55,
          balancedue: 0,
          commissionRatePercent: 5,
          commissionpayable: 2.75,
          agentCode: 'Spice Manchester',
          clientOwnerAtPurchaseDate: 'Spice Manchester',
          bookingStatus: 'Booked',
          eventName: "Hilton Manchester New Year's Eve Gala Ball",
          eventOwner: 'Spice Manchester',
          eventCommences: '31/12/2018 19:00'
        },
        {
          id: 'MA-v1HhHBjOIpkhjsfURW',
          bookingRef: 'MCR0382221',
          bookedOn: '27/12/2018 22:08',
          client: 'June Gilbert',
          ticketoption: 'Member',
          ticketquantity: 1,
          ticketprice: 55,
          totaldue: 55,
          totaldueCalc: 55,
          totalpaid: 55,
          balancedue: 0,
          commissionRatePercent: 5,
          commissionpayable: 2.75,
          agentCode: 'Spice Manchester',
          clientOwnerAtPurchaseDate: 'Spice Manchester',
          bookingStatus: 'Booked',
          eventName: "Hilton Manchester New Year's Eve Gala Ball",
          eventOwner: 'Spice Manchester',
          eventCommences: '31/12/2018 19:00'
        },
        {
          id: 'SG77YQp-CQOergit8Ow2c',
          bookingRef: 'MCR0381942',
          bookedOn: '30/11/2018 09:16',
          client: 'Karen Hampson',
          ticketoption: 'Member',
          ticketquantity: 1,
          ticketprice: 55,
          totaldue: 55,
          totaldueCalc: 55,
          totalpaid: 55,
          balancedue: 0,
          commissionRatePercent: 5,
          commissionpayable: 2.75,
          agentCode: 'Spice Manchester',
          clientOwnerAtPurchaseDate: 'Spice Manchester',
          bookingStatus: 'Booked',
          eventName: "Hilton Manchester New Year's Eve Gala Ball",
          eventOwner: 'Spice Manchester',
          eventCommences: '31/12/2018 19:00'
        },
        {
          id: 'TKUnvUgUy0pBy53WF2AUx',
          bookingRef: 'MCR0381524',
          bookedOn: '02/11/2018 13:07',
          client: 'Margaret Byrne',
          ticketoption: 'Member',
          ticketquantity: 1,
          ticketprice: 55,
          totaldue: 55,
          totaldueCalc: 55,
          totalpaid: 55,
          balancedue: 0,
          commissionRatePercent: 5,
          commissionpayable: 2.75,
          agentCode: 'Spice Manchester',
          clientOwnerAtPurchaseDate: 'Spice Manchester',
          bookingStatus: 'Booked',
          eventName: "Hilton Manchester New Year's Eve Gala Ball",
          eventOwner: 'Spice Manchester',
          eventCommences: '31/12/2018 19:00'
        },
        {
          id: 'of3sB0sdU-azEmxCiUhA7',
          bookingRef: 'MCR0381965',
          bookedOn: '03/12/2018 10:46',
          client: 'Sharon Walsh',
          ticketoption: 'Member',
          ticketquantity: 1,
          ticketprice: 55,
          totaldue: 55,
          totaldueCalc: 55,
          totalpaid: 55,
          balancedue: 0,
          commissionRatePercent: 5,
          commissionpayable: 2.75,
          agentCode: 'Spice Manchester',
          clientOwnerAtPurchaseDate: 'Spice Manchester',
          bookingStatus: 'Booked',
          eventName: "Hilton Manchester New Year's Eve Gala Ball",
          eventOwner: 'Spice Manchester',
          eventCommences: '31/12/2018 19:00'
        },
        {
          id: '0OzJBZhDRuX8QSrt2oKgy',
          bookingRef: 'MCR0381998',
          bookedOn: '04/12/2018 14:44',
          client: 'Shirley Monks-Meagher',
          ticketoption: 'Member',
          ticketquantity: 1,
          ticketprice: 55,
          totaldue: 55,
          totaldueCalc: 55,
          totalpaid: 55,
          balancedue: 0,
          commissionRatePercent: 5,
          commissionpayable: 2.75,
          agentCode: 'Spice Manchester',
          clientOwnerAtPurchaseDate: 'Spice Manchester',
          bookingStatus: 'Booked',
          eventName: "Hilton Manchester New Year's Eve Gala Ball",
          eventOwner: 'Spice Manchester',
          eventCommences: '31/12/2018 19:00'
        },
        {
          id: 'JRAK5eK1egPg_McrRmFKR',
          bookingRef: 'MCR0381587',
          bookedOn: '05/11/2018 17:21',
          client: 'Rosane Pagano',
          ticketoption: 'Member',
          ticketquantity: 1,
          ticketprice: 55,
          totaldue: 55,
          totaldueCalc: 55,
          totalpaid: 55,
          balancedue: 0,
          commissionRatePercent: 5,
          commissionpayable: 2.75,
          agentCode: 'Spice Manchester',
          clientOwnerAtPurchaseDate: 'Spice Manchester',
          bookingStatus: 'Booked',
          eventName: "Hilton Manchester New Year's Eve Gala Ball",
          eventOwner: 'Spice Manchester',
          eventCommences: '31/12/2018 19:00'
        },
        {
          id: 'GC6IPZwpXA9nTy0zm-gqV',
          bookingRef: 'MCR0381565',
          bookedOn: '05/11/2018 10:17',
          client: 'Janet Best',
          ticketoption: 'Member',
          ticketquantity: 2,
          ticketprice: 55,
          totaldue: 110,
          totaldueCalc: 110,
          totalpaid: 110,
          balancedue: 0,
          commissionRatePercent: 5,
          commissionpayable: 5.5,
          agentCode: 'Spice Manchester',
          clientOwnerAtPurchaseDate: 'Spice Manchester',
          bookingStatus: 'Booked',
          eventName: "Hilton Manchester New Year's Eve Gala Ball",
          eventOwner: 'Spice Manchester',
          eventCommences: '31/12/2018 19:00'
        },
        {
          id: 'gE4l5u_qyK8HtOLoZ6dp_',
          bookingRef: 'YRK0330866',
          bookedOn: '06/11/2018 23:45',
          client: 'Julie Steen',
          ticketoption: 'Member',
          ticketquantity: 1,
          ticketprice: 55,
          totaldue: 55,
          totaldueCalc: 55,
          totalpaid: 55,
          balancedue: 0,
          commissionRatePercent: 5,
          commissionpayable: 2.75,
          agentCode: 'Spice Yorkshire',
          clientOwnerAtPurchaseDate: 'Spice Yorkshire',
          bookingStatus: 'Booked',
          eventName: "Hilton Manchester New Year's Eve Gala Ball",
          eventOwner: 'Spice Manchester',
          eventCommences: '31/12/2018 19:00'
        },
        {
          id: 'b6eoN4TondpufQhiZbmL6',
          bookingRef: 'MCR0382059',
          bookedOn: '07/12/2018 23:27',
          client: 'Patricia Hixon',
          ticketoption: 'Member',
          ticketquantity: 1,
          ticketprice: 55,
          totaldue: 55,
          totaldueCalc: 55,
          totalpaid: 55,
          balancedue: 0,
          commissionRatePercent: 5,
          commissionpayable: 2.75,
          agentCode: 'Spice Manchester',
          clientOwnerAtPurchaseDate: 'Spice Manchester',
          bookingStatus: 'Booked',
          eventName: "Hilton Manchester New Year's Eve Gala Ball",
          eventOwner: 'Spice Manchester',
          eventCommences: '31/12/2018 19:00'
        },
        {
          id: 'X9Z-AIMa-8xC3P3mma8gD',
          bookingRef: 'MCR0382053',
          bookedOn: '07/12/2018 15:33',
          client: 'Andy Dearden',
          ticketoption: 'Guest',
          ticketquantity: 1,
          ticketprice: 79,
          totaldue: 134,
          totaldueCalc: 79,
          totalpaid: 134,
          balancedue: 0,
          commissionRatePercent: 5,
          commissionpayable: 6.7,
          agentCode: 'Spice Manchester',
          clientOwnerAtPurchaseDate: 'Spice Manchester',
          bookingStatus: 'Booked',
          eventName: "Hilton Manchester New Year's Eve Gala Ball",
          eventOwner: 'Spice Manchester',
          eventCommences: '31/12/2018 19:00'
        },
        {
          id: 'PkkGzyokmMLSp751lvlIr',
          bookingRef: 'MCR0382053',
          bookedOn: '07/12/2018 15:33',
          client: 'Andy Dearden',
          ticketoption: 'Member',
          ticketquantity: 1,
          ticketprice: 55,
          totaldue: 134,
          totaldueCalc: 55,
          totalpaid: 134,
          balancedue: 0,
          commissionRatePercent: 5,
          commissionpayable: 6.7,
          agentCode: 'Spice Manchester',
          clientOwnerAtPurchaseDate: 'Spice Manchester',
          bookingStatus: 'Booked',
          eventName: "Hilton Manchester New Year's Eve Gala Ball",
          eventOwner: 'Spice Manchester',
          eventCommences: '31/12/2018 19:00'
        },
        {
          id: 'qmI_xhHThDgf71y3dn_wa',
          bookingRef: 'YRK0330917',
          bookedOn: '11/11/2018 21:58',
          client: 'Graham Smith',
          ticketoption: 'Member',
          ticketquantity: 1,
          ticketprice: 55,
          totaldue: 55,
          totaldueCalc: 55,
          totalpaid: 55,
          balancedue: 0,
          commissionRatePercent: 5,
          commissionpayable: 2.75,
          agentCode: 'Spice Yorkshire',
          clientOwnerAtPurchaseDate: 'Spice Yorkshire',
          bookingStatus: 'Booked',
          eventName: "Hilton Manchester New Year's Eve Gala Ball",
          eventOwner: 'Spice Manchester',
          eventCommences: '31/12/2018 19:00'
        },
        {
          id: 'LZPjYJ87HP6P8A74XceQo',
          bookingRef: 'MCR0381949',
          bookedOn: '01/12/2018 11:48',
          client: 'Geraldine Flanagan',
          ticketoption: 'Member',
          ticketquantity: 1,
          ticketprice: 55,
          totaldue: 55,
          totaldueCalc: 55,
          totalpaid: 55,
          balancedue: 0,
          commissionRatePercent: 5,
          commissionpayable: 2.75,
          agentCode: 'Spice Manchester',
          clientOwnerAtPurchaseDate: 'Spice Manchester',
          bookingStatus: 'Booked',
          eventName: "Hilton Manchester New Year's Eve Gala Ball",
          eventOwner: 'Spice Manchester',
          eventCommences: '31/12/2018 19:00'
        },
        {
          id: 'V96o-G9yB0DvcDNs9qb0S',
          bookingRef: 'MCR0381511',
          bookedOn: '01/11/2018 20:58',
          client: 'Helen Robinson',
          ticketoption: 'Member',
          ticketquantity: 1,
          ticketprice: 55,
          totaldue: 55,
          totaldueCalc: 55,
          totalpaid: 55,
          balancedue: 0,
          commissionRatePercent: 5,
          commissionpayable: 2.75,
          agentCode: 'Spice Manchester',
          clientOwnerAtPurchaseDate: 'Spice Manchester',
          bookingStatus: 'Booked',
          eventName: "Hilton Manchester New Year's Eve Gala Ball",
          eventOwner: 'Spice Manchester',
          eventCommences: '31/12/2018 19:00'
        },
        {
          id: 'F27PzSEr8vXAHR0Wp2Fer',
          bookingRef: 'MCR0381540',
          bookedOn: '02/11/2018 21:14',
          client: 'Julie Mason',
          ticketoption: 'Member',
          ticketquantity: 1,
          ticketprice: 55,
          totaldue: 55,
          totaldueCalc: 55,
          totalpaid: 55,
          balancedue: 0,
          commissionRatePercent: 5,
          commissionpayable: 2.75,
          agentCode: 'Spice Manchester',
          clientOwnerAtPurchaseDate: 'Spice Manchester',
          bookingStatus: 'Booked',
          eventName: "Hilton Manchester New Year's Eve Gala Ball",
          eventOwner: 'Spice Manchester',
          eventCommences: '31/12/2018 19:00'
        },
        {
          id: 'l_dFUKrfpRp2Dd2CT0GlV',
          bookingRef: 'MCR0381532',
          bookedOn: '02/11/2018 15:09',
          client: 'Leonard Koppel',
          ticketoption: 'Member',
          ticketquantity: 1,
          ticketprice: 55,
          totaldue: 55,
          totaldueCalc: 55,
          totalpaid: 55,
          balancedue: 0,
          commissionRatePercent: 5,
          commissionpayable: 2.75,
          agentCode: 'Spice Manchester',
          clientOwnerAtPurchaseDate: 'Spice Manchester',
          bookingStatus: 'Booked',
          eventName: "Hilton Manchester New Year's Eve Gala Ball",
          eventOwner: 'Spice Manchester',
          eventCommences: '31/12/2018 19:00'
        },
        {
          id: 'TzdfIySIQ42x3gFMR81zg',
          bookingRef: 'MCR0381531',
          bookedOn: '02/11/2018 15:06',
          client: 'Dean Padley',
          ticketoption: 'Member',
          ticketquantity: 2,
          ticketprice: 55,
          totaldue: 110,
          totaldueCalc: 110,
          totalpaid: 110,
          balancedue: 0,
          commissionRatePercent: 5,
          commissionpayable: 5.5,
          agentCode: 'Spice Manchester',
          clientOwnerAtPurchaseDate: 'Spice Manchester',
          bookingStatus: 'Booked',
          eventName: "Hilton Manchester New Year's Eve Gala Ball",
          eventOwner: 'Spice Manchester',
          eventCommences: '31/12/2018 19:00'
        },
        {
          id: 'JR8xE-MbxWm38kBZ-zczh',
          bookingRef: 'MCR0381525',
          bookedOn: '02/11/2018 13:10',
          client: 'John Weatherbed',
          ticketoption: 'Member',
          ticketquantity: 1,
          ticketprice: 55,
          totaldue: 0,
          totaldueCalc: 55,
          totalpaid: 0,
          balancedue: 0,
          commissionRatePercent: 5,
          commissionpayable: 0,
          agentCode: 'Spice Manchester',
          clientOwnerAtPurchaseDate: 'Spice Manchester',
          bookingStatus: 'Booked',
          eventName: "Hilton Manchester New Year's Eve Gala Ball",
          eventOwner: 'Spice Manchester',
          eventCommences: '31/12/2018 19:00'
        }
      ]
    }
  ]
  return (
    <div>
      <Container>
        <Content>
          <div style={{ height: '100%' }}>
            <div style={{ padding: '0 10px 0' }}>
              <Text justify='flex-end' size='14px'>{data[0].user.email}</Text>
              <Text justify='flex-end' size='14px'>{data[0].user.issuer}</Text>
              <Text justify='flex-end' size='14px'>{data[0].user.oauthProvider}</Text>
            </div>
            <HeadTitle>
              <Text justify='center' margin='5px 0' bold='bold' size='30px'>Commission Invoice</Text>
            </HeadTitle>
            <Section >
              {/* 1 */}
              <Card direction='column' height='100px'>
                <ContentInnerDates borderBottom='1px solid'>
                  <Text bold='bold' size='15px'>To: Jesus Juvinao</Text>
                </ContentInnerDates>
                <ContentInnerDates>
                  <Text bold='bold' size='15px'>Rob <br />{data[1]?.eventData?.eventName}</Text>
                </ContentInnerDates>
              </Card>
              {/* 2 */}
              <Card justify='space-between' direction='column' height='100px'>
                <Info>
                  <ContentInnerDates borderRight='1px solid'>
                    <Text justify='center' bold='bold' size='12px'>Invoice No</Text>
                  </ContentInnerDates>
                  <ContentInnerDates>
                    <Text justify='center' bold='bold' size='12px'>12312</Text>
                  </ContentInnerDates>
                </Info>
                <Info>
                  <ContentInnerDates borderRight='1px solid'>
                    <Text justify='center' bold='bold' size='12px'>Date</Text>
                  </ContentInnerDates>
                  <ContentInnerDates>
                    <Text justify='center' bold='bold' size='12px'>{data[1]?.eventData?.eventCommencesDate}</Text>
                  </ContentInnerDates>
                </Info>
                <Info>
                  <ContentInnerDates borderRight='1px solid'>
                    <Text justify='center' bold='bold' size='12px'>Vat No </Text>
                  </ContentInnerDates>
                  <ContentInnerDates>
                    <Text justify='center' bold='bold' size='12px'>N/A</Text>
                  </ContentInnerDates>
                </Info>
                <Info>
                  <ContentInnerDates borderRight='1px solid'>
                    <Text justify='center' bold='bold' size='12px'>Commission</Text>
                  </ContentInnerDates>
                  <ContentInnerDates>
                    <Text justify='center' bold='bold' size='12px'> {data[1].commissionInvoices?.map(x => (
                      <tr key={x.id}>
                        <td>{x.eventName}</td>
                        <td>{x.eventCommences}</td>
                        <td>{x.eventOwner}</td>
                        <td>{x.ticketprice}</td>
                        <td>{x.totaldue}</td>
                        <td>{x.commissionpayable}</td>
                        <td>{x.totaldueCalc}</td>
                      </tr>
                    ))}</Text>
                  </ContentInnerDates>
                </Info>
              </Card>
              {/* 3 */}
              <Card height='100px'>
                <Text bold='bold' justify='center' size='15px'>{data[1]?.eventData?.eventOwner}</Text>
              </Card>
              <Card height='100px'>
                <Image
                  src="/images/company-finance.jpg"
                  alt="Picture of the author"
                  width={100}
                  height={100}
                  objectFit={'contain'}
                />
              </Card>
            </Section>
            <HeadTitle>
              <Text justify='center' margin='.1rem 0' size='14px'>Events that ran with a profit</Text>
            </HeadTitle>
            <Table height='30vh'>
              <table>
                <tr>
                  <th>EVENT</th>
                  <th>DATE</th>
                  <th>SLOTS</th>
                  <th>Event Selling Price</th>
                  <th>Total Selling Price</th>
                  <th>Commission</th>
                  <th>Invoice Amount</th>
                </tr>
                <tbody id="tbody-main">
                  {data[1]?.ticketPurchases?.map(x => (
                    <tr key={x.id}>
                      <td>{x.eventName}</td>
                      <td>{x.eventCommences}</td>
                      <td>{x.eventOwner}</td>
                      <td>{x.ticketprice}</td>
                      <td>{x.totaldue}</td>
                      <td>{x.commissionpayable}</td>
                      <td>{x.totaldueCalc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Table>
            {/* Lol */}
            <HeadTitle>
              <Text justify='center' margin='.1rem 0' size='14px'>Events that ran with no profit</Text>
            </HeadTitle>
            <Table height='30vh'>
              <table>
                <tr>
                  <th>EVENT</th>
                  <th>DATE</th>
                  <th>SLOTS</th>
                  <th>Event Selling Price</th>
                  <th>Total Selling Price</th>
                  <th>Commission</th>
                  <th>Invoice Amount</th>
                </tr>
                <tbody id="tbody-main">
                  {data[1]?.ticketPurchases?.map(x => (
                    <tr key={x.id}>
                      <td>{x.client}</td>
                      <td>{x.client}</td>
                      <td>{x.client}</td>
                      <td>{x.client}</td>
                      <td>{x.client}</td>
                      <td>{x.client}</td>
                      <td>{x.client}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Table>
            <table >
              <tbody>
                <tr>
                  <td> hello&nbsp;</td>
                </tr>
              </tbody>
            </table>
            <ContentInnerDates>
              <Text size='20px'>Total Sales For Event</Text>
              <Text size='30px'>{data[1]?.totalSalesForEvent}</Text>
            </ContentInnerDates>
            <Footer>
              <CommentsSection>
                <Text size="20px" >Comments</Text>
                <ContentComments>
                </ContentComments>
              </CommentsSection>
              <span>Spice East Midlans is a trading name of</span>
            </Footer>
          </div>
        </Content>
      </Container>
    </div>
  )
}

const Info = styled.div`
  display: grid; 
  width: 100%;
  align-items: center;
  place-content: center;
  border-top: 1px solid;
  border-bottom: 1px solid;
  &:first-child {
    border-top: none;
  }
  &:last-child {
    border-bottom: none;
  }
  grid-template-columns: 50% repeat(auto-fill, 50%);
`
const ContentComments = styled.div`
  height: 10px;
`
const CommentsSection = styled.div`
`
const Footer = styled.div`
  border-top: 1px solid;
  border-bottom: 1px solid;
`
PdfC.propTypes = {
  data: PropTypes.object || PropTypes.array,
  setAlertBox: PropTypes.func
}
