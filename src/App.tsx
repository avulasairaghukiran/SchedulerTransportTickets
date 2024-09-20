import { useCallback, useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
// import { createMockData } from './mock/appMock';
import { StyledSchedulerFrame } from './styles';
import { Scheduler, SchedulerProjectData } from '.';
import { ParsedDatesRange } from './utils/getDatesRange';
import { dataRetrive } from './Helpers/Data-helper';
import { transformData } from './Helpers/FormatDataverseData';
import { redirectToRecord } from './Helpers/RedirectRecord';
import { SchedulerRow } from './types/global';
import { CiFilter } from "react-icons/ci";
const SampleData = [
    {
        "@odata.etag": "W/\"16938065\"",
        "avpx_brl_city": "Mississauga",
        "statuscode@OData.Community.Display.V1.FormattedValue": "Active",
        "statuscode": 1,
        "_createdby_value@OData.Community.Display.V1.FormattedValue": "Prexa Trial",
        "_createdby_value@Microsoft.Dynamics.CRM.lookuplogicalname": "systemuser",
        "_createdby_value": "7c6fe5dd-06a5-ed11-aacf-000d3a09c725",
        "_modifiedby_value@OData.Community.Display.V1.FormattedValue": "Prexa Trial",
        "_modifiedby_value@Microsoft.Dynamics.CRM.lookuplogicalname": "systemuser",
        "_modifiedby_value": "7c6fe5dd-06a5-ed11-aacf-000d3a09c725",
        "_avpx_status_value@OData.Community.Display.V1.FormattedValue": "New",
        "_avpx_status_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "avpx_Status",
        "_avpx_status_value@Microsoft.Dynamics.CRM.lookuplogicalname": "avpx_ticketstatus",
        "_avpx_status_value": "571ec35a-080c-ed11-b83d-002248ae415b",
        "avpx_brl_country": "Canada",
        "_ownerid_value@OData.Community.Display.V1.FormattedValue": "Prexa Trial",
        "_ownerid_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "ownerid",
        "_ownerid_value@Microsoft.Dynamics.CRM.lookuplogicalname": "systemuser",
        "_ownerid_value": "7c6fe5dd-06a5-ed11-aacf-000d3a09c725",
        "avpx_distancekm@OData.Community.Display.V1.FormattedValue": "0.00",
        "avpx_distancekm": 0,
        "modifiedon@OData.Community.Display.V1.FormattedValue": "9/18/2024 3:50 PM",
        "modifiedon": "2024-09-18T10:20:40Z",
        "avpx_brl_streetaddress": "2233 Argentia Rd",
        "avpx_jsl_ccountry": "India",
        "avpx_type@OData.Community.Display.V1.FormattedValue": "Drive",
        "avpx_type": 783090000,
        "avpx_ticketno": "1022",
        "avpx_savetodocuments@OData.Community.Display.V1.FormattedValue": "No",
        "avpx_savetodocuments": false,
        "avpx_jsl_stateorprovince": "Gujarat",
        "avpx_dispatchdate@OData.Community.Display.V1.FormattedValue": "9/18/2024 8:00 AM",
        "avpx_dispatchdate": "2024-09-18T02:30:00Z",
        "_owningbusinessunit_value@OData.Community.Display.V1.FormattedValue": "prexatrials2",
        "_owningbusinessunit_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "owningbusinessunit",
        "_owningbusinessunit_value@Microsoft.Dynamics.CRM.lookuplogicalname": "businessunit",
        "_owningbusinessunit_value": "8a68e5dd-06a5-ed11-aacf-000d3a09c725",
        "_avpx_driver_value@OData.Community.Display.V1.FormattedValue": "Allan Smith",
        "_avpx_driver_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "avpx_Driver",
        "_avpx_driver_value@Microsoft.Dynamics.CRM.lookuplogicalname": "contact",
        "_avpx_driver_value": "68a57e47-f72f-ef11-8e4f-6045bdcd2d41",
        "avpx_tickettype@OData.Community.Display.V1.FormattedValue": "Inhouse",
        "avpx_tickettype": 783090000,
        "avpx_brl_postalcode": "L5N 2X7",
        "statecode@OData.Community.Display.V1.FormattedValue": "Active",
        "statecode": 0,
        "avpx_deliverydatefrom@OData.Community.Display.V1.FormattedValue": "9/19/2024 8:00 AM",
        "avpx_deliverydatefrom": "2024-09-19T02:30:00Z",
        "_avpx_salesorders_value@OData.Community.Display.V1.FormattedValue": "SO-1012",
        "_avpx_salesorders_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "avpx_SalesOrders",
        "_avpx_salesorders_value@Microsoft.Dynamics.CRM.lookuplogicalname": "avpx_salesorders",
        "_avpx_salesorders_value": "c2aec69e-77a5-ed11-aad0-000d3af45e7f",
        "avpx_brl_stateorprovince": "Ontario",
        "avpx_branchaddress": "\r\n2233 Argentia Rd\r\nMississauga\r\nOntario\r\nL5N 2X7\r\nCanada ",
        "avpx_jsl_streetaddress": "345 Lakhia Ni Pol Road",
        "avpx_name": "DP - 1022",
        "avpx_jsl_city": "Ahmedabad",
        "avpx_deliverydateto@OData.Community.Display.V1.FormattedValue": "9/19/2024 10:00 AM",
        "avpx_deliverydateto": "2024-09-19T04:30:00Z",
        "avpx_distance@OData.Community.Display.V1.FormattedValue": "0.00",
        "avpx_distance": 0,
        "avpx_jsl_postalcode": "380001",
        "avpx_brl_suiteno": "12",
        "_avpx_rentalorder_value@OData.Community.Display.V1.FormattedValue": "RES - 1086",
        "_avpx_rentalorder_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "avpx_RentalOrder",
        "_avpx_rentalorder_value@Microsoft.Dynamics.CRM.lookuplogicalname": "avpx_rentalreservation",
        "_avpx_rentalorder_value": "8d5f1dfb-a159-ef11-bfe3-000d3a0a0162",
        "createdon@OData.Community.Display.V1.FormattedValue": "9/18/2024 3:50 PM",
        "createdon": "2024-09-18T10:20:39Z",
        "avpx_transporttype@OData.Community.Display.V1.FormattedValue": "Dispatch",
        "avpx_transporttype": 783090000,
        "avpx_ticketid": "3cad9ea1-a775-ef11-ac20-000d3a09c8c5"
    },
    {
        "@odata.etag": "W/\"16015606\"",
        "avpx_brl_city": "Mississauga",
        "statuscode@OData.Community.Display.V1.FormattedValue": "Active",
        "statuscode": 1,
        "avpx_jobsiteaddress": "345 Lakhia Ni Pol Road\nAhmedabad\nGujarat\n380001\nIndia",
        "_createdby_value@OData.Community.Display.V1.FormattedValue": "Prexa Trial",
        "_createdby_value@Microsoft.Dynamics.CRM.lookuplogicalname": "systemuser",
        "_createdby_value": "7c6fe5dd-06a5-ed11-aacf-000d3a09c725",
        "avpx_driverdetails": "fvdfgdrg",
        "_modifiedby_value@OData.Community.Display.V1.FormattedValue": "Prexa Trial",
        "_modifiedby_value@Microsoft.Dynamics.CRM.lookuplogicalname": "systemuser",
        "_modifiedby_value": "7c6fe5dd-06a5-ed11-aacf-000d3a09c725",
        "_avpx_status_value@OData.Community.Display.V1.FormattedValue": "New",
        "_avpx_status_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "avpx_Status",
        "_avpx_status_value@Microsoft.Dynamics.CRM.lookuplogicalname": "avpx_ticketstatus",
        "_avpx_status_value": "571ec35a-080c-ed11-b83d-002248ae415b",
        "avpx_brl_country": "Canada",
        "_ownerid_value@OData.Community.Display.V1.FormattedValue": "Prexa Trial",
        "_ownerid_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "ownerid",
        "_ownerid_value@Microsoft.Dynamics.CRM.lookuplogicalname": "systemuser",
        "_ownerid_value": "7c6fe5dd-06a5-ed11-aacf-000d3a09c725",
        "modifiedon@OData.Community.Display.V1.FormattedValue": "8/13/2024 11:42 PM",
        "modifiedon": "2024-08-13T18:12:59Z",
        "avpx_brl_streetaddress": "2233 Argentia Rd",
        "avpx_jsl_ccountry": "India",
        "avpx_ticketno": "1021",
        "avpx_savetodocuments@OData.Community.Display.V1.FormattedValue": "No",
        "avpx_savetodocuments": false,
        "avpx_jsl_stateorprovince": "Gujarat",
        "avpx_dispatchdate@OData.Community.Display.V1.FormattedValue": "8/15/2024 8:00 AM",
        "avpx_dispatchdate": "2024-08-15T02:30:00Z",
        "_owningbusinessunit_value@OData.Community.Display.V1.FormattedValue": "prexatrials2",
        "_owningbusinessunit_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "owningbusinessunit",
        "_owningbusinessunit_value@Microsoft.Dynamics.CRM.lookuplogicalname": "businessunit",
        "_owningbusinessunit_value": "8a68e5dd-06a5-ed11-aacf-000d3a09c725",
        "avpx_tickettype@OData.Community.Display.V1.FormattedValue": "Outsourced",
        "avpx_tickettype": 783090001,
        "avpx_brl_postalcode": "L5N 2X7",
        "statecode@OData.Community.Display.V1.FormattedValue": "Active",
        "statecode": 0,
        "avpx_brl_stateorprovince": "Ontario",
        "avpx_branchaddress": "\r\n2233 Argentia Rd\r\nMississauga\r\nOntario\r\nL5N 2X7\r\nCanada ",
        "avpx_jsl_streetaddress": "345 Lakhia Ni Pol Road",
        "avpx_name": "DP - 1021",
        "avpx_jsl_city": "Ahmedabad",
        "avpx_jsl_postalcode": "380001",
        "_avpx_rentalorder_value@OData.Community.Display.V1.FormattedValue": "RC - 1085",
        "_avpx_rentalorder_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "avpx_RentalOrder",
        "_avpx_rentalorder_value@Microsoft.Dynamics.CRM.lookuplogicalname": "avpx_rentalreservation",
        "_avpx_rentalorder_value": "4a450c5d-9f59-ef11-bfe3-000d3a0a0162",
        "createdon@OData.Community.Display.V1.FormattedValue": "8/13/2024 11:42 PM",
        "createdon": "2024-08-13T18:12:58Z",
        "avpx_transporttype@OData.Community.Display.V1.FormattedValue": "Dispatch",
        "avpx_transporttype": 783090000,
        "avpx_ticketid": "1f183eab-9f59-ef11-bfe3-000d3a0a0162"
    },
    {
        "@odata.etag": "W/\"15058773\"",
        "avpx_brl_city": "Mississauga",
        "statuscode@OData.Community.Display.V1.FormattedValue": "Active",
        "statuscode": 1,
        "avpx_jobsiteaddress": "5883 S Mingo Rd,\r\n\r\nTulsa,\r\nOK\r\n74146\r\nUSA ",
        "_createdby_value@OData.Community.Display.V1.FormattedValue": "Prexa User3",
        "_createdby_value@Microsoft.Dynamics.CRM.lookuplogicalname": "systemuser",
        "_createdby_value": "481ae52b-e3e2-ed11-8848-000d3a0a2267",
        "_modifiedby_value@OData.Community.Display.V1.FormattedValue": "Prexa User3",
        "_modifiedby_value@Microsoft.Dynamics.CRM.lookuplogicalname": "systemuser",
        "_modifiedby_value": "481ae52b-e3e2-ed11-8848-000d3a0a2267",
        "_avpx_status_value@OData.Community.Display.V1.FormattedValue": "Complete",
        "_avpx_status_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "avpx_Status",
        "_avpx_status_value@Microsoft.Dynamics.CRM.lookuplogicalname": "avpx_ticketstatus",
        "_avpx_status_value": "727a5b81-080c-ed11-b83d-002248ae415b",
        "avpx_brl_country": "Canada",
        "avpx_receiverssignature": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAABLKADAAQAAAABAAAAlgAAAABJS0H3AAAGa0lEQVR4Ae3dz4ocRRwH8GiCBwMmoIdIhHgQJBfFB9AH0SfwATzlcTznHQQhlxxCAiIkeIggKEZj/E+M0fqxXdBsz/bWTKZ7fr39Kejsbk11VfWnmi/ds7Odc+dyl//K9GJ72DjN51372EchQOCMCby8kOP5snGeNxvbaUaAAIG9CrxReqtXWFe26Lnu88MW+2hKgACBFxL4vOxdw+d4RxFmD8r2rGxxG9i/Faz7/FLqFQIECMwicL+MUsPnk/L9plCqr2/6OsskDUKAwLoFPi2H/1fZNoXQaXURahF0CgECBPYm8GPp6d+ybXvVFIEV+9wum0KAAIFJBP4uve4STvWK6otJZqVTAgQIFIF4w3ubgIq2sT0pWy3xhnoE1uNa4SsBAgT2IfBZ6aQloKJNXG21lNrfty2NtSFA4OwLXHiBQ/yt7HuxbC+d0kcEz/lT2mx6ufb7aNOL6ggQWJ/AtoEV4VOD5CStuI3b5yfoXWGdJK2ewMoEWoOl3p5tCqsIqPhUebwWW2ufpWlT+aqplUYECJx5gZYrrAik42XfV1HH++//fKv/g+8JECCwSeBGqYxg6m+b2k1Rd6k37hT965MAgTMmUG8DI7Di+znLx2WwGpRzjmssAgQSC4y939R/v2qs3RSHd32KTvVJgMCyBeYOolat31sbakeAwHoEsgbWelbAkRIg0CwgsJqpNCRA4NACAuvQK2B8AgSaBcYCK35LpxAgQCCNwFhgpZmkiRAgQCAEBJbzgACBxQiMBdbPizkKEyVAYBUCY4H1R08gHmesECBA4KACY4HV/6R7//uDTtjgBAisV2AssD4sLL+WLR5RPNZuvXqOnACBWQXGHi/zsMwknpqgECBAIIWAK6cUy2ASBAi0CGQNrHiCaRQfXj1y8C8BAkUga2BZHAIECAwEBNaARAUBAlkFBFbWlTEvAgQGAgJrQKKCAIGsAgIr68qYFwECAwGBNSBRQYBAVgGBlXVlzIsAgYGAwBqQqCBAIKuAwMq6MuZFgMBAQGANSFQQIJBVQGBlXRnzIkBgIJA1sP7pZuo5XIMlU0FgvQJZA+t+tyT++Hm956YjJ7AYgXhOV4RVbFlDdTGYJkqAwPQC8Rz5CKz3ph/KCAQILEEg89XL0w7w3SVAmiMBAtMLZA6sP7vDf2d6BiMQILAEgcyB9aQDvLYESHMkQGB6gcyB9VN3+FenZzACAQJLEMgcWPW57leWAGmOBAhML5A5sL7rDv/16RmMQIDAEgQyB1b8v4hRXjv64l8CBNYukDmwvukW5+LaF8nxEyBwJJA5sL7uFukVi0WAAIHsAhGm/jwn+yqZH4EZBTJfYT0vDvWpDddnNDEUAQJJBTIHVpA97tx8tCHpCWRaBOYUyB5YNzuM9+dEMRYBAjkFsgfWvY7NExtynj9mRWBWgeyBdbfTcIU162lhMAIEdhF4tewUvymMZ2Od36UD+xAgQGBOgfg8VoTWB3MOaiwCBPIJZL8lDDG3hfnOGzMicBCBJQWWN94PcooYlEAegSUEVv1NoTfe85w3ZkKAwAkCb5X6eA/r0QmvqyZAgEAqge/LbCK03k41K5MhQGBWgSXcEgbInU7lzVl1DEaAAIEdBC6XfT7aYT+7ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgS2FvgfLB/BV08yVAYAAAAASUVORK5CYII=",
        "_ownerid_value@OData.Community.Display.V1.FormattedValue": "Prexa User3",
        "_ownerid_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "ownerid",
        "_ownerid_value@Microsoft.Dynamics.CRM.lookuplogicalname": "systemuser",
        "_ownerid_value": "481ae52b-e3e2-ed11-8848-000d3a0a2267",
        "avpx_distancekm@OData.Community.Display.V1.FormattedValue": "1,878.98",
        "avpx_distancekm": 1878.98,
        "modifiedon@OData.Community.Display.V1.FormattedValue": "6/21/2024 11:34 PM",
        "modifiedon": "2024-06-21T18:04:15Z",
        "avpx_brl_streetaddress": "656 Twain Ave",
        "avpx_jsl_ccountry": "USA",
        "avpx_ticketno": "1020",
        "avpx_savetodocuments@OData.Community.Display.V1.FormattedValue": "No",
        "avpx_savetodocuments": false,
        "avpx_jsl_stateorprovince": "OK",
        "avpx_dispatchdate@OData.Community.Display.V1.FormattedValue": "6/22/2024 8:00 AM",
        "avpx_dispatchdate": "2024-06-22T02:30:00Z",
        "_owningbusinessunit_value@OData.Community.Display.V1.FormattedValue": "Bloss Equipment",
        "_owningbusinessunit_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "owningbusinessunit",
        "_owningbusinessunit_value@Microsoft.Dynamics.CRM.lookuplogicalname": "businessunit",
        "_owningbusinessunit_value": "3233a44a-5427-ef11-840a-6045bdcd2d41",
        "_avpx_driver_value@OData.Community.Display.V1.FormattedValue": "Allan Smith",
        "_avpx_driver_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "avpx_Driver",
        "_avpx_driver_value@Microsoft.Dynamics.CRM.lookuplogicalname": "contact",
        "_avpx_driver_value": "68a57e47-f72f-ef11-8e4f-6045bdcd2d41",
        "avpx_tickettype@OData.Community.Display.V1.FormattedValue": "Inhouse",
        "avpx_tickettype": 783090000,
        "avpx_brl_postalcode": "L5W 0A3",
        "statecode@OData.Community.Display.V1.FormattedValue": "Active",
        "statecode": 0,
        "avpx_deliverydatefrom@OData.Community.Display.V1.FormattedValue": "6/28/2024 8:00 AM",
        "avpx_deliverydatefrom": "2024-06-28T02:30:00Z",
        "avpx_brl_stateorprovince": "Ontario",
        "avpx_branchaddress": "656 Twain Ave\nMississauga\nOntario\nL5W 0A3\nCanada",
        "avpx_name": "DP - 1020",
        "avpx_jsl_city": "Tulsa,",
        "avpx_deliverydateto@OData.Community.Display.V1.FormattedValue": "6/28/2024 10:00 AM",
        "avpx_deliverydateto": "2024-06-28T04:30:00Z",
        "avpx_distance@OData.Community.Display.V1.FormattedValue": "1,167.55",
        "avpx_distance": 1167.55,
        "avpx_jsl_postalcode": "74146",
        "_avpx_rentalorder_value@OData.Community.Display.V1.FormattedValue": "RC - 1062",
        "_avpx_rentalorder_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "avpx_RentalOrder",
        "_avpx_rentalorder_value@Microsoft.Dynamics.CRM.lookuplogicalname": "avpx_rentalreservation",
        "_avpx_rentalorder_value": "bd801edc-3b2f-ef11-8e4f-6045bdcd2d41",
        "createdon@OData.Community.Display.V1.FormattedValue": "6/21/2024 11:33 PM",
        "createdon": "2024-06-21T18:03:25Z",
        "avpx_jsl_suiteno": "5883 S Mingo Rd,",
        "avpx_transporttype@OData.Community.Display.V1.FormattedValue": "Dispatch",
        "avpx_transporttype": 783090000,
        "avpx_ticketid": "64eed787-f82f-ef11-8e50-002248d51571"
    },
    {
        "@odata.etag": "W/\"15058467\"",
        "avpx_brl_city": "Mississauga",
        "statuscode@OData.Community.Display.V1.FormattedValue": "Active",
        "statuscode": 1,
        "avpx_jobsiteaddress": "5883 S Mingo Rd,\r\n\r\nTulsa,\r\nOK\r\n74146\r\nUSA ",
        "_createdby_value@OData.Community.Display.V1.FormattedValue": "Prexa User3",
        "_createdby_value@Microsoft.Dynamics.CRM.lookuplogicalname": "systemuser",
        "_createdby_value": "481ae52b-e3e2-ed11-8848-000d3a0a2267",
        "_modifiedby_value@OData.Community.Display.V1.FormattedValue": "Prexa User3",
        "_modifiedby_value@Microsoft.Dynamics.CRM.lookuplogicalname": "systemuser",
        "_modifiedby_value": "481ae52b-e3e2-ed11-8848-000d3a0a2267",
        "_avpx_status_value@OData.Community.Display.V1.FormattedValue": "Complete",
        "_avpx_status_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "avpx_Status",
        "_avpx_status_value@Microsoft.Dynamics.CRM.lookuplogicalname": "avpx_ticketstatus",
        "_avpx_status_value": "727a5b81-080c-ed11-b83d-002248ae415b",
        "avpx_brl_country": "Canada",
        "avpx_receiverssignature": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAABLKADAAQAAAABAAAAlgAAAABJS0H3AAADKUlEQVR4Ae3QMQEAAADCoPVPbQhfiEBhwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBg4B0Yv9QAAQ+mdHoAAAAASUVORK5CYII=",
        "_ownerid_value@OData.Community.Display.V1.FormattedValue": "Prexa User3",
        "_ownerid_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "ownerid",
        "_ownerid_value@Microsoft.Dynamics.CRM.lookuplogicalname": "systemuser",
        "_ownerid_value": "481ae52b-e3e2-ed11-8848-000d3a0a2267",
        "avpx_distancekm@OData.Community.Display.V1.FormattedValue": "1,889.17",
        "avpx_distancekm": 1889.17,
        "modifiedon@OData.Community.Display.V1.FormattedValue": "6/21/2024 11:27 PM",
        "modifiedon": "2024-06-21T17:57:23Z",
        "avpx_brl_streetaddress": "315 Madill Blvd",
        "avpx_jsl_ccountry": "USA",
        "avpx_ticketno": "1019",
        "avpx_savetodocuments@OData.Community.Display.V1.FormattedValue": "No",
        "avpx_savetodocuments": false,
        "avpx_jsl_stateorprovince": "OK",
        "avpx_dispatchdate@OData.Community.Display.V1.FormattedValue": "6/22/2024 8:00 AM",
        "avpx_dispatchdate": "2024-06-22T02:30:00Z",
        "_owningbusinessunit_value@OData.Community.Display.V1.FormattedValue": "Bloss Equipment",
        "_owningbusinessunit_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "owningbusinessunit",
        "_owningbusinessunit_value@Microsoft.Dynamics.CRM.lookuplogicalname": "businessunit",
        "_owningbusinessunit_value": "3233a44a-5427-ef11-840a-6045bdcd2d41",
        "_avpx_driver_value@OData.Community.Display.V1.FormattedValue": "Allan Smith",
        "_avpx_driver_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "avpx_Driver",
        "_avpx_driver_value@Microsoft.Dynamics.CRM.lookuplogicalname": "contact",
        "_avpx_driver_value": "68a57e47-f72f-ef11-8e4f-6045bdcd2d41",
        "avpx_tickettype@OData.Community.Display.V1.FormattedValue": "Inhouse",
        "avpx_tickettype": 783090000,
        "avpx_brl_postalcode": "L5W 0H1",
        "statecode@OData.Community.Display.V1.FormattedValue": "Active",
        "statecode": 0,
        "avpx_deliverydatefrom@OData.Community.Display.V1.FormattedValue": "6/23/2024 8:00 AM",
        "avpx_deliverydatefrom": "2024-06-23T02:30:00Z",
        "avpx_brl_stateorprovince": "Ontario",
        "avpx_branchaddress": "315 Madill Blvd\nMississauga\nOntario\nL5W 0H1\nCanada",
        "avpx_name": "DP - 1019",
        "avpx_jsl_city": "Tulsa,",
        "avpx_deliverydateto@OData.Community.Display.V1.FormattedValue": "6/23/2024 10:00 AM",
        "avpx_deliverydateto": "2024-06-23T04:30:00Z",
        "avpx_distance@OData.Community.Display.V1.FormattedValue": "1,173.88",
        "avpx_distance": 1173.88,
        "avpx_jsl_postalcode": "74146",
        "_avpx_rentalorder_value@OData.Community.Display.V1.FormattedValue": "RC - 1063",
        "_avpx_rentalorder_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "avpx_RentalOrder",
        "_avpx_rentalorder_value@Microsoft.Dynamics.CRM.lookuplogicalname": "avpx_rentalreservation",
        "_avpx_rentalorder_value": "93d73f33-f62f-ef11-8e4f-6045bdcd2d41",
        "createdon@OData.Community.Display.V1.FormattedValue": "6/21/2024 11:25 PM",
        "createdon": "2024-06-21T17:55:09Z",
        "avpx_jsl_suiteno": "5883 S Mingo Rd,",
        "avpx_transporttype@OData.Community.Display.V1.FormattedValue": "Dispatch",
        "avpx_transporttype": 783090000,
        "avpx_ticketid": "17614e60-f72f-ef11-8e4f-6045bdcd2d41"
    },
    {
        "@odata.etag": "W/\"13134037\"",
        "avpx_brl_city": "Mississauga",
        "statuscode@OData.Community.Display.V1.FormattedValue": "Active",
        "statuscode": 1,
        "_createdby_value@OData.Community.Display.V1.FormattedValue": "Prexa User 2",
        "_createdby_value@Microsoft.Dynamics.CRM.lookuplogicalname": "systemuser",
        "_createdby_value": "7a746e73-33da-ed11-a7c6-000d3a0a2267",
        "_modifiedby_value@OData.Community.Display.V1.FormattedValue": "Prexa User 2",
        "_modifiedby_value@Microsoft.Dynamics.CRM.lookuplogicalname": "systemuser",
        "_modifiedby_value": "7a746e73-33da-ed11-a7c6-000d3a0a2267",
        "_avpx_status_value@OData.Community.Display.V1.FormattedValue": "New",
        "_avpx_status_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "avpx_Status",
        "_avpx_status_value@Microsoft.Dynamics.CRM.lookuplogicalname": "avpx_ticketstatus",
        "_avpx_status_value": "571ec35a-080c-ed11-b83d-002248ae415b",
        "avpx_brl_country": "Canada",
        "_ownerid_value@OData.Community.Display.V1.FormattedValue": "Prexa User 2",
        "_ownerid_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "ownerid",
        "_ownerid_value@Microsoft.Dynamics.CRM.lookuplogicalname": "systemuser",
        "_ownerid_value": "7a746e73-33da-ed11-a7c6-000d3a0a2267",
        "modifiedon@OData.Community.Display.V1.FormattedValue": "5/15/2024 7:53 PM",
        "modifiedon": "2024-05-15T14:23:22Z",
        "avpx_purpose": "gfsfggg",
        "avpx_brl_streetaddress": "2233 Argentia Rd",
        "avpx_type@OData.Community.Display.V1.FormattedValue": "Drive",
        "avpx_type": 783090000,
        "avpx_ticketno": "1018",
        "avpx_savetodocuments@OData.Community.Display.V1.FormattedValue": "No",
        "avpx_savetodocuments": false,
        "avpx_pickupdate@OData.Community.Display.V1.FormattedValue": "5/17/2024 5:30 PM",
        "avpx_pickupdate": "2024-05-17T12:00:00Z",
        "_owningbusinessunit_value@OData.Community.Display.V1.FormattedValue": "prexatrials2",
        "_owningbusinessunit_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "owningbusinessunit",
        "_owningbusinessunit_value@Microsoft.Dynamics.CRM.lookuplogicalname": "businessunit",
        "_owningbusinessunit_value": "8a68e5dd-06a5-ed11-aacf-000d3a09c725",
        "_avpx_driver_value@OData.Community.Display.V1.FormattedValue": "Nadia S",
        "_avpx_driver_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "avpx_Driver",
        "_avpx_driver_value@Microsoft.Dynamics.CRM.lookuplogicalname": "contact",
        "_avpx_driver_value": "f2bda5a9-4b02-ef11-9f8a-000d3a0a2484",
        "avpx_tickettype@OData.Community.Display.V1.FormattedValue": "Inhouse",
        "avpx_tickettype": 783090000,
        "avpx_brl_postalcode": "L5N 2X7",
        "statecode@OData.Community.Display.V1.FormattedValue": "Active",
        "statecode": 0,
        "avpx_brl_stateorprovince": "Ontario",
        "avpx_branchaddress": "\r\n2233 Argentia Rd\r\nMississauga\r\nOntario\r\nL5N 2X7\r\nCanada ",
        "avpx_name": "PU - 1018",
        "_avpx_rentalorder_value@OData.Community.Display.V1.FormattedValue": "RC - 1058",
        "_avpx_rentalorder_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "avpx_RentalOrder",
        "_avpx_rentalorder_value@Microsoft.Dynamics.CRM.lookuplogicalname": "avpx_rentalreservation",
        "_avpx_rentalorder_value": "074002e8-c412-ef11-9f89-6045bdcd0cbc",
        "createdon@OData.Community.Display.V1.FormattedValue": "5/15/2024 7:53 PM",
        "createdon": "2024-05-15T14:23:06Z",
        "avpx_transporttype@OData.Community.Display.V1.FormattedValue": "Pickup",
        "avpx_transporttype": 783090001,
        "avpx_ticketid": "9f4bc0a1-c612-ef11-9f8a-000d3a0a2484"
    },
    {
        "@odata.etag": "W/\"13129047\"",
        "avpx_brl_city": "Mississauga",
        "statuscode@OData.Community.Display.V1.FormattedValue": "Active",
        "statuscode": 1,
        "avpx_jobsiteaddress": "3619 Mississauga Rd\nMississauga\nOntario\nCanada",
        "_createdby_value@OData.Community.Display.V1.FormattedValue": "Prexa User 2",
        "_createdby_value@Microsoft.Dynamics.CRM.lookuplogicalname": "systemuser",
        "_createdby_value": "7a746e73-33da-ed11-a7c6-000d3a0a2267",
        "_modifiedby_value@OData.Community.Display.V1.FormattedValue": "Prexa User 2",
        "_modifiedby_value@Microsoft.Dynamics.CRM.lookuplogicalname": "systemuser",
        "_modifiedby_value": "7a746e73-33da-ed11-a7c6-000d3a0a2267",
        "_avpx_status_value@OData.Community.Display.V1.FormattedValue": "Complete",
        "_avpx_status_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "avpx_Status",
        "_avpx_status_value@Microsoft.Dynamics.CRM.lookuplogicalname": "avpx_ticketstatus",
        "_avpx_status_value": "727a5b81-080c-ed11-b83d-002248ae415b",
        "avpx_brl_country": "Canada",
        "avpx_receiverssignature": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAAMsUlEQVR4Xu2dScgtxRXH9WkcNgpOC6eFEjURRARxRHHlLqIxRBxXERxw5U6XunIpKm7EGSeSuHPhItFIIAREJIkaIhgNUVFRN86J5/C6ePX66/76dA3dVdW/C8X93r2nqk/9TtX/na5b3X3gAbwgAAEIVELgwEr8xE0IQAACByBYDAIIQKAaAghWNaHCUQhAAMFiDEAAAtUQQLCqCRWOQgACCBZjAAIQqIYAglVNqHAUAhBAsBgDEIBANQQQrGpChaMQgACCxRiAAASqIYBgVRMqHIUABBAsxgAEIFANAQSrmlDhKAQggGAxBiAAgWoIIFjVhApHIQABBIsxAAEIVEMAwaomVDgKAQggWIwBCECgGgIIVjWhwlEIQADBYgxAAALVEECwqgkVjkIAAggWYwACEKiGAIJVTahwFAIQQLAYAxCAQDUEEKxqQoWjEIAAgsUYgAAEqiGAYFUTKhyFAAQQLMYABCBQDQEEq5pQ4SgEIIBgMQYgAIFqCCBY1YQKRyEAAQSLMQABCFRDAMGqJlQ4CgEIbFmwvpHwHzJjCPxfbP8n5QspR8+ohykEIJCIwFYFS0XniAQMVcS0fC/l0ATt0QQEILALga0K1g/CZE/HRbMmy8vZT9kiYlOE+B4CgQS2KlgqUq7vIQz0dPJgT/Sm8CNiU4T4HgIGAiGT1dBs8SYqIPrSd2vmNNWpOSKmx9Us7ydTjW7gez2dPsj7D2QDXaaLoQS2LliaaelkyfWyipj68ZmUY3M5UmC7fpar7v1BymUF+olLBRFAsPIK1lCo/fWzsaGgGdh3UtxC/j/l71MNWUgt8XQZbr//tfhf0BTelitbHSBuwuTOsKZGk4qSroWlfJUeU1+sPpGOH+N1vnTfU8aJtgIIbHWAlCJY/ZBp9qUxmYrL0C+bbi0u5bpcwJDatYovVq+L5TlScqwnpvab9gohMDUxCnEzuRulCpZ2tL+2M9Z57YNmKMd1BrG/fCaH3GvQ98+JlZq4WHwtfx+e2wnar5sAgrX8GtbYiHlbvjit9+W38m9/Q+rQ+pfLqPzvSovrw9KPm7u+fSDvJ3n9dIL1F/nsvLqnE97nJlDawM7dX9d+aRlWX4im1tbGhCtmb1lO9v6poD/mSs8KczKh7QACWxcsRbY2g/4p4Dvi0+nGWO6WcRmbyG72LznCKd1Rrpf3p7q//X6XvO6WHRAHsBNYe7LaPU1r6f8696U0fWTa5s2t9QUnJB4fydHcOpYeeCo7MzuXyHBoUR2xSgR3a82ETJBWGK3965QvmikyDBU/fX0o5YRCgqRrcG43vxtriFUhwanRjS0L1pqL1P+QwXKGN2BajMN10r8nuz6+K++60O5fipRCpGucc/gcQaDFiTIHx1pZlr8I/ZY4/LM5TldiO7abvcTT1kqQ4ubWBWuNX6n8Y+qFvy1eAP2q9Oviken1oHx+G1MPAiEEti5Y/o38lhCP/n24cl54HTIeUtR5QBq5daAhhCoF3Y23sXXB0vCP7RFKPTT6t2Rukf3QLv2/C8gzU8OkvW0SaHHSzI2kLyS5tji0vshew36wueMC+wIJIFh7g5I7y2p1kd3fttAf3oytAid87S4xqPZG0N8T1b9+LzbGLS6y/02g/HwXMLqNQe/fxQsCSQkgWPtw5siyWltk321B3V9oZ1wlnaY05ggwsPaNBf8XwxSXt7S0yK5CdYuU/nhxv/zpHRjc7nr/ekFmGgSSEkCw9sfpn77FLsDnyNiSBn+iMT011ruhDo0R/5e/K8Xmt11b/5H3E5d0kmNtiwCCtTPeKYSmxkX2xwTFDSMC5SjpWl//adkpeG1r1tHbYAII1k50/gJ8yGbS2PrBwQyoaBEpzTofkfKbgfb9U8Gr5PvfBfhAFQiYCSBYw6hisoaYuubARRhOiZT6/4SUmyaOwalgRBCoGkYAwRrm5i/Az72rgBOskOwsLIrTtVKJlH+kNa7DnO4pFk0TQLDGwxuyf8o/HVybbQ6RcrTukj/u6f5xr7zf3fQsoXPFEFh7UhUDYsQR//TO8qvh2qeDOUXKR+T2l6XY/lH6GMC/ggggWLsHwz81VMsp0Vrj4RZLidRQdqWZlWZYvCCwCAEEaxpzX7TGmOlz9dwjuXJzfVqOdY2UseNYF86ne7/TguwqhBp1khDIPbGSOFlAI5Zd67kXodcUKbKrAgYhLqz/iKuaYuAvqKvf/Yukc91ueejWLY5bzkxqKDZkVzWN2AZ9JcOaF9Sx+z7p/a7c3QtS3LBuSqSekeNdO8/1aGv/l0HWrqJx0kAIAQRrPrX+6WG/hVCmX0lDh424o5mU7io/eb67yWqQXSVDSUOhBEInV+jxWqqnwqUPkPAZzt1kuptIKav3VxYpFy+yq5ZGbsV9QbDig+efvqmIjWVJ7kj/lj/0jga7/dp4eLxbSVsgu0qKk8ZCCSBYoeT21bM8kHVKpEregEl2FT9GaCERAQQrHuTY7vapbQgli5RPhewqfozQQiICCFY8yP7FzlO/8O2JP+RiLZBdLYaaA1kIIFgWSuM2/t4szZiGxEgFbY1tCHE921ub7CoFRdpIRgDBikPpnw72W3pBPvhVXPOr1ia7WhU/Bx8igGCFj4vfS9UrBqrXLlSuS2RX4WODmpkIIFhhYIc2j7YiVEqE7CpsXFArMwEEaz5g/yJnV7s1jmRX88cFNRYg0NpEy41sSKzm7m7P7WNs+2RXsQSpn40AgmVH629XUJFy7FJc7Gz3Ir8l2VV+xhwhkACCZQP3iZgd3Zm6XwYdu5YYkl3ZxgNWKxFoabLlRNjfzZ7r3lc5+2Bpm+zKQgmb1QggWDb0/Xu1u39bLna2HWF9K7Kr9WOABxMEEKx9gPSGeFdL0ScY91++YOl3bkd7S/zIrpCL4gm0NOFiYb8oDfxCyh1S7u815guWf/lNK/xukf4+2PWZu4nGjiTqZyPQyoRLAejX0ohe8/dXKecaBKukJzvH9l/vT683I9Qs6+DYxqgPgVwEEKz9yX4s/zxWyk1SHve+8hfZW/t18ELp52tdX2+V94dyDTbahUAsAQRrf4IvyT8vl/JfKccPCJZv3Qq7z6VTR0qp5f5csWOe+hUTaGXSpQrBT6Whd7rG/LWs/l0ZWpncfnalF3NfmQok7UAgBwEEayfVP8lHF0nRzaJ6eqivvmC1wu0t6dvpXR9b6VOOeUKbhRBgkO4MhJ9lPSBf396wYDkhflv6eEYhYxI3IDBKAMEaRvOefKzPAHQbQ1vMsPR2OL8ku0IdaiKAYA1H6yz5+I3uq2flXbc8+K8WuH0tHTpUCtlVTTN24762MPFyhfBTafio7nSwz6l2brqj//kOnIrzm7kg0i4EUhKofeKlZNFv62z54PWRA9TO7T7p151S9CEah+SESNsQSEmg9omXksVQW2MPmaid28XS2ZelPCflxtwQaR8CqQjUPvFScRhrx12y0v8ebrnJ0z4EBggw8aaHxaNiopfq+C+4TXPDAgLJCTDxbEhb3NZg6zlWECiIAIJlCwaCZeOEFQSyEkCwbHgRLBsnrCCQlQCCZcOLYNk4YQWBrAQQLBteBMvGCSsIZCWAYNnwIlg2TlhBICsBBMuG1xes1p70bCOAFQQKIIBg2YLgC1YrN++z9RwrCBREAMGyBQPBsnHCCgJZCSBYNrwIlo0TVhDISgDBsuFFsGycsIJAVgIIlg2vrls5Vqxh2ZhhBYHkBBAsG1L3GHe1RrBszLCCQHICCJYNKYJl44QVBLISQLBseH3BaukR9bbeYwWBQgggWLZA+IIFMxszrCCQnACTz4b0j2J2SWcKMxszrCCQnACTz47UbW2AmZ0ZlhBISoDJZ8eJYNlZYQmBLAQQLDtWBMvOCksIZCGAYNmxOsF6Rapcaq+GJQQgkIoAgmUn6QSLjaN2ZlhCICkBBMuOE8Gys8ISAlkIIFh2rAiWnRWWEMhCAMGyY0Ww7KywhEAWAgiWHasTLG6RbGeGJQSSEkCw7Dj9e2LBzc4NSwgkI8DEs6NEsOyssIRAFgIIlh0rgmVnhSUEshBAsOxYESw7KywhkIUAgmXH+mcxPb8zh5udG5YQSEaAiTcPJdcTzuOFNQSSEkCw5uHULOs8KXvmVcMaAhBIQQDBmk9RReuC+dWoAQEIxBJAsGIJUh8CEFiMAIK1GGoOBAEIxBJAsGIJUh8CEFiMAIK1GGoOBAEIxBJAsGIJUh8CEFiMAIK1GGoOBAEIxBJAsGIJUh8CEFiMAIK1GGoOBAEIxBJAsGIJUh8CEFiMAIK1GGoOBAEIxBJAsGIJUh8CEFiMAIK1GGoOBAEIxBJAsGIJUh8CEFiMAIK1GGoOBAEIxBL4EcYmv6ZyEW6jAAAAAElFTkSuQmCC",
        "_ownerid_value@OData.Community.Display.V1.FormattedValue": "Prexa User 2",
        "_ownerid_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "ownerid",
        "_ownerid_value@Microsoft.Dynamics.CRM.lookuplogicalname": "systemuser",
        "_ownerid_value": "7a746e73-33da-ed11-a7c6-000d3a0a2267",
        "avpx_distancekm@OData.Community.Display.V1.FormattedValue": "10.40",
        "avpx_distancekm": 10.4,
        "modifiedon@OData.Community.Display.V1.FormattedValue": "5/15/2024 12:19 AM",
        "modifiedon": "2024-05-14T18:49:09Z",
        "avpx_brl_streetaddress": "2233 Argentia Rd",
        "avpx_jsl_ccountry": "Canada",
        "avpx_type@OData.Community.Display.V1.FormattedValue": "Drive",
        "avpx_type": 783090000,
        "avpx_ticketno": "1017",
        "avpx_savetodocuments@OData.Community.Display.V1.FormattedValue": "No",
        "avpx_savetodocuments": false,
        "avpx_jsl_stateorprovince": "Ontario",
        "avpx_pickupdate@OData.Community.Display.V1.FormattedValue": "5/15/2024 5:30 PM",
        "avpx_pickupdate": "2024-05-15T12:00:00Z",
        "_owningbusinessunit_value@OData.Community.Display.V1.FormattedValue": "prexatrials2",
        "_owningbusinessunit_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "owningbusinessunit",
        "_owningbusinessunit_value@Microsoft.Dynamics.CRM.lookuplogicalname": "businessunit",
        "_owningbusinessunit_value": "8a68e5dd-06a5-ed11-aacf-000d3a09c725",
        "_avpx_driver_value@OData.Community.Display.V1.FormattedValue": "Nadia S",
        "_avpx_driver_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "avpx_Driver",
        "_avpx_driver_value@Microsoft.Dynamics.CRM.lookuplogicalname": "contact",
        "_avpx_driver_value": "f2bda5a9-4b02-ef11-9f8a-000d3a0a2484",
        "avpx_tickettype@OData.Community.Display.V1.FormattedValue": "Inhouse",
        "avpx_tickettype": 783090000,
        "avpx_brl_postalcode": "L5N 2X7",
        "statecode@OData.Community.Display.V1.FormattedValue": "Active",
        "statecode": 0,
        "avpx_brl_stateorprovince": "Ontario",
        "avpx_branchaddress": "\r\n2233 Argentia Rd\r\nMississauga\r\nOntario\r\nL5N 2X7\r\nCanada ",
        "avpx_jsl_streetaddress": "3619 Mississauga Rd",
        "avpx_name": "PU - 1017",
        "avpx_jsl_city": "Mississauga",
        "avpx_distance@OData.Community.Display.V1.FormattedValue": "6.46",
        "avpx_distance": 6.46,
        "_avpx_rentalorder_value@OData.Community.Display.V1.FormattedValue": "RC - 1057",
        "_avpx_rentalorder_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "avpx_RentalOrder",
        "_avpx_rentalorder_value@Microsoft.Dynamics.CRM.lookuplogicalname": "avpx_rentalreservation",
        "_avpx_rentalorder_value": "bad93e1a-2212-ef11-9f89-6045bdcd0cbc",
        "createdon@OData.Community.Display.V1.FormattedValue": "5/15/2024 12:17 AM",
        "createdon": "2024-05-14T18:47:38Z",
        "avpx_transporttype@OData.Community.Display.V1.FormattedValue": "Pickup",
        "avpx_transporttype": 783090001,
        "avpx_ticketid": "c5e8fa6e-2212-ef11-9f89-6045bdcd0cbc"
    },
    {
        "@odata.etag": "W/\"12997304\"",
        "statuscode@OData.Community.Display.V1.FormattedValue": "Active",
        "statuscode": 1,
        "_createdby_value@OData.Community.Display.V1.FormattedValue": "Prexa Trial",
        "_createdby_value@Microsoft.Dynamics.CRM.lookuplogicalname": "systemuser",
        "_createdby_value": "7c6fe5dd-06a5-ed11-aacf-000d3a09c725",
        "_modifiedby_value@OData.Community.Display.V1.FormattedValue": "Prexa Trial",
        "_modifiedby_value@Microsoft.Dynamics.CRM.lookuplogicalname": "systemuser",
        "_modifiedby_value": "7c6fe5dd-06a5-ed11-aacf-000d3a09c725",
        "_avpx_status_value@OData.Community.Display.V1.FormattedValue": "New",
        "_avpx_status_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "avpx_Status",
        "_avpx_status_value@Microsoft.Dynamics.CRM.lookuplogicalname": "avpx_ticketstatus",
        "_avpx_status_value": "571ec35a-080c-ed11-b83d-002248ae415b",
        "_ownerid_value@OData.Community.Display.V1.FormattedValue": "Prexa Trial",
        "_ownerid_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "ownerid",
        "_ownerid_value@Microsoft.Dynamics.CRM.lookuplogicalname": "systemuser",
        "_ownerid_value": "7c6fe5dd-06a5-ed11-aacf-000d3a09c725",
        "modifiedon@OData.Community.Display.V1.FormattedValue": "4/30/2024 7:14 PM",
        "modifiedon": "2024-04-30T13:44:51Z",
        "avpx_jsl_ccountry": "India",
        "avpx_ticketno": "1016",
        "avpx_savetodocuments@OData.Community.Display.V1.FormattedValue": "No",
        "avpx_savetodocuments": false,
        "avpx_jsl_stateorprovince": "Gujarat",
        "avpx_pickupdate@OData.Community.Display.V1.FormattedValue": "4/30/2024 5:30 AM",
        "avpx_pickupdate": "2024-04-30T00:00:00Z",
        "_owningbusinessunit_value@OData.Community.Display.V1.FormattedValue": "prexatrials2",
        "_owningbusinessunit_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "owningbusinessunit",
        "_owningbusinessunit_value@Microsoft.Dynamics.CRM.lookuplogicalname": "businessunit",
        "_owningbusinessunit_value": "8a68e5dd-06a5-ed11-aacf-000d3a09c725",
        "statecode@OData.Community.Display.V1.FormattedValue": "Active",
        "statecode": 0,
        "avpx_branchaddress": "\r\n2233 Argentia Rd\r\nMississauga\r\nOntario\r\nL5N 2X7\r\nCanada ",
        "avpx_jsl_streetaddress": "238 Haja Patel Ni Pole Road",
        "avpx_name": "PU - 1016",
        "avpx_jsl_city": "Ahmedabad",
        "avpx_jsl_postalcode": "380001",
        "_avpx_rentalorder_value@OData.Community.Display.V1.FormattedValue": "RC - 1053",
        "_avpx_rentalorder_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "avpx_RentalOrder",
        "_avpx_rentalorder_value@Microsoft.Dynamics.CRM.lookuplogicalname": "avpx_rentalreservation",
        "_avpx_rentalorder_value": "6c3d9472-f706-ef11-9f89-002248d56be9",
        "createdon@OData.Community.Display.V1.FormattedValue": "4/30/2024 7:14 PM",
        "createdon": "2024-04-30T13:44:50Z",
        "avpx_transporttype@OData.Community.Display.V1.FormattedValue": "Pickup",
        "avpx_transporttype": 783090001,
        "avpx_ticketid": "a4b74bcb-f706-ef11-9f89-002248d56be9"
    },
    {
        "@odata.etag": "W/\"12869917\"",
        "avpx_brl_city": "Arundel",
        "statuscode@OData.Community.Display.V1.FormattedValue": "Active",
        "statuscode": 1,
        "avpx_jobsiteaddress": "\r\n2233 Argentia Rd\r\nMississauga\r\nOntario\r\nL5N 2X7\r\nCanada ",
        "_createdby_value@OData.Community.Display.V1.FormattedValue": "Prexa Trial",
        "_createdby_value@Microsoft.Dynamics.CRM.lookuplogicalname": "systemuser",
        "_createdby_value": "7c6fe5dd-06a5-ed11-aacf-000d3a09c725",
        "avpx_driverdetails": "as",
        "_modifiedby_value@OData.Community.Display.V1.FormattedValue": "Prexa Trial",
        "_modifiedby_value@Microsoft.Dynamics.CRM.lookuplogicalname": "systemuser",
        "_modifiedby_value": "7c6fe5dd-06a5-ed11-aacf-000d3a09c725",
        "_avpx_status_value@OData.Community.Display.V1.FormattedValue": "New",
        "_avpx_status_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "avpx_Status",
        "_avpx_status_value@Microsoft.Dynamics.CRM.lookuplogicalname": "avpx_ticketstatus",
        "_avpx_status_value": "571ec35a-080c-ed11-b83d-002248ae415b",
        "avpx_brl_country": "United States",
        "_ownerid_value@OData.Community.Display.V1.FormattedValue": "Prexa Trial",
        "_ownerid_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "ownerid",
        "_ownerid_value@Microsoft.Dynamics.CRM.lookuplogicalname": "systemuser",
        "_ownerid_value": "7c6fe5dd-06a5-ed11-aacf-000d3a09c725",
        "avpx_distancekm@OData.Community.Display.V1.FormattedValue": "993.74",
        "avpx_distancekm": 993.74,
        "modifiedon@OData.Community.Display.V1.FormattedValue": "4/29/2024 7:59 PM",
        "modifiedon": "2024-04-29T14:29:49Z",
        "avpx_brl_streetaddress": "1232 Blue Star Memorial Hwy",
        "avpx_jsl_ccountry": "Canada",
        "avpx_ticketno": "1015",
        "avpx_savetodocuments@OData.Community.Display.V1.FormattedValue": "Yes",
        "avpx_savetodocuments": true,
        "avpx_jsl_stateorprovince": "Ontario",
        "avpx_dispatchdate@OData.Community.Display.V1.FormattedValue": "4/29/2024 8:00 AM",
        "avpx_dispatchdate": "2024-04-29T02:30:00Z",
        "_owningbusinessunit_value@OData.Community.Display.V1.FormattedValue": "prexatrials2",
        "_owningbusinessunit_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "owningbusinessunit",
        "_owningbusinessunit_value@Microsoft.Dynamics.CRM.lookuplogicalname": "businessunit",
        "_owningbusinessunit_value": "8a68e5dd-06a5-ed11-aacf-000d3a09c725",
        "avpx_tickettype@OData.Community.Display.V1.FormattedValue": "Outsourced",
        "avpx_tickettype": 783090001,
        "avpx_brl_postalcode": "04046",
        "statecode@OData.Community.Display.V1.FormattedValue": "Active",
        "statecode": 0,
        "avpx_brl_stateorprovince": "Maine",
        "avpx_branchaddress": "1232 Blue Star Memorial Hwy\nArundel\nMaine\n04046\nUnited States",
        "avpx_jsl_streetaddress": "2233 Argentia Rd",
        "avpx_name": "DP - 1015",
        "avpx_jsl_city": "Mississauga",
        "avpx_distance@OData.Community.Display.V1.FormattedValue": "617.48",
        "avpx_distance": 617.48,
        "avpx_jsl_postalcode": "L5N 2X7",
        "_avpx_rentalorder_value@OData.Community.Display.V1.FormattedValue": "RC - 1050",
        "_avpx_rentalorder_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "avpx_RentalOrder",
        "_avpx_rentalorder_value@Microsoft.Dynamics.CRM.lookuplogicalname": "avpx_rentalreservation",
        "_avpx_rentalorder_value": "b08cef36-3406-ef11-9f8a-000d3a0a2484",
        "createdon@OData.Community.Display.V1.FormattedValue": "4/29/2024 7:59 PM",
        "createdon": "2024-04-29T14:29:45Z",
        "avpx_transporttype@OData.Community.Display.V1.FormattedValue": "Dispatch",
        "avpx_transporttype": 783090000,
        "avpx_ticketid": "03dde9e6-3406-ef11-9f8a-000d3a0a2484"
    },
    {
        "@odata.etag": "W/\"12869870\"",
        "avpx_brl_city": "Arundel",
        "statuscode@OData.Community.Display.V1.FormattedValue": "Active",
        "statuscode": 1,
        "avpx_jobsiteaddress": "\r\n2233 Argentia Rd\r\nMississauga\r\nOntario\r\nL5N 2X7\r\nCanada ",
        "_createdby_value@OData.Community.Display.V1.FormattedValue": "Prexa Trial",
        "_createdby_value@Microsoft.Dynamics.CRM.lookuplogicalname": "systemuser",
        "_createdby_value": "7c6fe5dd-06a5-ed11-aacf-000d3a09c725",
        "_modifiedby_value@OData.Community.Display.V1.FormattedValue": "Prexa Trial",
        "_modifiedby_value@Microsoft.Dynamics.CRM.lookuplogicalname": "systemuser",
        "_modifiedby_value": "7c6fe5dd-06a5-ed11-aacf-000d3a09c725",
        "_avpx_status_value@OData.Community.Display.V1.FormattedValue": "New",
        "_avpx_status_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "avpx_Status",
        "_avpx_status_value@Microsoft.Dynamics.CRM.lookuplogicalname": "avpx_ticketstatus",
        "_avpx_status_value": "571ec35a-080c-ed11-b83d-002248ae415b",
        "avpx_brl_country": "United States",
        "_ownerid_value@OData.Community.Display.V1.FormattedValue": "Prexa Trial",
        "_ownerid_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "ownerid",
        "_ownerid_value@Microsoft.Dynamics.CRM.lookuplogicalname": "systemuser",
        "_ownerid_value": "7c6fe5dd-06a5-ed11-aacf-000d3a09c725",
        "avpx_distancekm@OData.Community.Display.V1.FormattedValue": "993.74",
        "avpx_distancekm": 993.74,
        "modifiedon@OData.Community.Display.V1.FormattedValue": "4/29/2024 7:59 PM",
        "modifiedon": "2024-04-29T14:29:07Z",
        "avpx_brl_streetaddress": "1232 Blue Star Memorial Hwy",
        "avpx_jsl_ccountry": "Canada",
        "avpx_type@OData.Community.Display.V1.FormattedValue": "Drive",
        "avpx_type": 783090000,
        "avpx_ticketno": "1014",
        "avpx_savetodocuments@OData.Community.Display.V1.FormattedValue": "No",
        "avpx_savetodocuments": false,
        "avpx_jsl_stateorprovince": "Ontario",
        "avpx_dispatchdate@OData.Community.Display.V1.FormattedValue": "4/29/2024 8:00 AM",
        "avpx_dispatchdate": "2024-04-29T02:30:00Z",
        "_owningbusinessunit_value@OData.Community.Display.V1.FormattedValue": "prexatrials2",
        "_owningbusinessunit_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "owningbusinessunit",
        "_owningbusinessunit_value@Microsoft.Dynamics.CRM.lookuplogicalname": "businessunit",
        "_owningbusinessunit_value": "8a68e5dd-06a5-ed11-aacf-000d3a09c725",
        "_avpx_driver_value@OData.Community.Display.V1.FormattedValue": "Nadia S",
        "_avpx_driver_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "avpx_Driver",
        "_avpx_driver_value@Microsoft.Dynamics.CRM.lookuplogicalname": "contact",
        "_avpx_driver_value": "f2bda5a9-4b02-ef11-9f8a-000d3a0a2484",
        "avpx_tickettype@OData.Community.Display.V1.FormattedValue": "Inhouse",
        "avpx_tickettype": 783090000,
        "avpx_brl_postalcode": "04046",
        "statecode@OData.Community.Display.V1.FormattedValue": "Active",
        "statecode": 0,
        "avpx_brl_stateorprovince": "Maine",
        "avpx_branchaddress": "1232 Blue Star Memorial Hwy\nArundel\nMaine\n04046\nUnited States",
        "avpx_jsl_streetaddress": "2233 Argentia Rd",
        "avpx_name": "DP - 1014",
        "avpx_jsl_city": "Mississauga",
        "avpx_distance@OData.Community.Display.V1.FormattedValue": "617.48",
        "avpx_distance": 617.48,
        "avpx_jsl_postalcode": "L5N 2X7",
        "_avpx_rentalorder_value@OData.Community.Display.V1.FormattedValue": "RC - 1050",
        "_avpx_rentalorder_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "avpx_RentalOrder",
        "_avpx_rentalorder_value@Microsoft.Dynamics.CRM.lookuplogicalname": "avpx_rentalreservation",
        "_avpx_rentalorder_value": "b08cef36-3406-ef11-9f8a-000d3a0a2484",
        "createdon@OData.Community.Display.V1.FormattedValue": "4/29/2024 7:59 PM",
        "createdon": "2024-04-29T14:29:05Z",
        "avpx_transporttype@OData.Community.Display.V1.FormattedValue": "Dispatch",
        "avpx_transporttype": 783090000,
        "avpx_ticketid": "0beaf0d0-3406-ef11-9f8a-000d3a0a2484"
    },
    {
        "@odata.etag": "W/\"12868894\"",
        "avpx_brl_city": "Ahmedabad",
        "statuscode@OData.Community.Display.V1.FormattedValue": "Active",
        "statuscode": 1,
        "avpx_jobsiteaddress": "\r\n2233 Argentia Rd\r\nMississauga\r\nOntario\r\nL5N 2X7\r\nCanada ",
        "_createdby_value@OData.Community.Display.V1.FormattedValue": "Prexa Trial",
        "_createdby_value@Microsoft.Dynamics.CRM.lookuplogicalname": "systemuser",
        "_createdby_value": "7c6fe5dd-06a5-ed11-aacf-000d3a09c725",
        "_modifiedby_value@OData.Community.Display.V1.FormattedValue": "Prexa Trial",
        "_modifiedby_value@Microsoft.Dynamics.CRM.lookuplogicalname": "systemuser",
        "_modifiedby_value": "7c6fe5dd-06a5-ed11-aacf-000d3a09c725",
        "_avpx_status_value@OData.Community.Display.V1.FormattedValue": "New",
        "_avpx_status_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "avpx_Status",
        "_avpx_status_value@Microsoft.Dynamics.CRM.lookuplogicalname": "avpx_ticketstatus",
        "_avpx_status_value": "571ec35a-080c-ed11-b83d-002248ae415b",
        "avpx_brl_country": "India",
        "_ownerid_value@OData.Community.Display.V1.FormattedValue": "Prexa Trial",
        "_ownerid_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "ownerid",
        "_ownerid_value@Microsoft.Dynamics.CRM.lookuplogicalname": "systemuser",
        "_ownerid_value": "7c6fe5dd-06a5-ed11-aacf-000d3a09c725",
        "modifiedon@OData.Community.Display.V1.FormattedValue": "4/29/2024 7:23 PM",
        "modifiedon": "2024-04-29T13:53:43Z",
        "avpx_brl_streetaddress": "Canal Road",
        "avpx_jsl_ccountry": "Canada",
        "avpx_type@OData.Community.Display.V1.FormattedValue": "Drive",
        "avpx_type": 783090000,
        "avpx_ticketno": "1013",
        "avpx_savetodocuments@OData.Community.Display.V1.FormattedValue": "Yes",
        "avpx_savetodocuments": true,
        "avpx_jsl_stateorprovince": "Ontario",
        "avpx_dispatchdate@OData.Community.Display.V1.FormattedValue": "4/30/2024 8:00 AM",
        "avpx_dispatchdate": "2024-04-30T02:30:00Z",
        "_owningbusinessunit_value@OData.Community.Display.V1.FormattedValue": "prexatrials2",
        "_owningbusinessunit_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "owningbusinessunit",
        "_owningbusinessunit_value@Microsoft.Dynamics.CRM.lookuplogicalname": "businessunit",
        "_owningbusinessunit_value": "8a68e5dd-06a5-ed11-aacf-000d3a09c725",
        "_avpx_driver_value@OData.Community.Display.V1.FormattedValue": "Nadia S",
        "_avpx_driver_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "avpx_Driver",
        "_avpx_driver_value@Microsoft.Dynamics.CRM.lookuplogicalname": "contact",
        "_avpx_driver_value": "f2bda5a9-4b02-ef11-9f8a-000d3a0a2484",
        "avpx_tickettype@OData.Community.Display.V1.FormattedValue": "Inhouse",
        "avpx_tickettype": 783090000,
        "statecode@OData.Community.Display.V1.FormattedValue": "Active",
        "statecode": 0,
        "avpx_deliverydatefrom@OData.Community.Display.V1.FormattedValue": "4/30/2024 8:00 AM",
        "avpx_deliverydatefrom": "2024-04-30T02:30:00Z",
        "avpx_brl_stateorprovince": "Gujarat",
        "avpx_branchaddress": "Canal Road\nAhmedabad\nGujarat\nIndia",
        "avpx_jsl_streetaddress": "2233 Argentia Rd",
        "avpx_name": "DP - 1013",
        "avpx_jsl_city": "Mississauga",
        "avpx_deliverydateto@OData.Community.Display.V1.FormattedValue": "4/30/2024 10:00 AM",
        "avpx_deliverydateto": "2024-04-30T04:30:00Z",
        "avpx_jsl_postalcode": "L5N 2X7",
        "_avpx_rentalorder_value@OData.Community.Display.V1.FormattedValue": "RC - 1049",
        "_avpx_rentalorder_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "avpx_RentalOrder",
        "_avpx_rentalorder_value@Microsoft.Dynamics.CRM.lookuplogicalname": "avpx_rentalreservation",
        "_avpx_rentalorder_value": "24582765-2f06-ef11-9f89-6045bdcd6a83",
        "createdon@OData.Community.Display.V1.FormattedValue": "4/29/2024 7:23 PM",
        "createdon": "2024-04-29T13:53:33Z",
        "avpx_transporttype@OData.Community.Display.V1.FormattedValue": "Dispatch",
        "avpx_transporttype": 783090000,
        "avpx_ticketid": "603c9fda-2f06-ef11-9f89-6045bdcd6a83"
    },
    {
        "@odata.etag": "W/\"12777958\"",
        "avpx_brl_city": "Ahmedabad",
        "statuscode@OData.Community.Display.V1.FormattedValue": "Active",
        "statuscode": 1,
        "avpx_jobsiteaddress": "\r\n2233 Argentia Rd\r\nMississauga\r\nOntario\r\nL5N 2X7\r\nCanada ",
        "_createdby_value@OData.Community.Display.V1.FormattedValue": "Prexa User 1",
        "_createdby_value@Microsoft.Dynamics.CRM.lookuplogicalname": "systemuser",
        "_createdby_value": "22ba5948-63d9-ed11-a7c6-000d3a0a2267",
        "_modifiedby_value@OData.Community.Display.V1.FormattedValue": "Prexa User 1",
        "_modifiedby_value@Microsoft.Dynamics.CRM.lookuplogicalname": "systemuser",
        "_modifiedby_value": "22ba5948-63d9-ed11-a7c6-000d3a0a2267",
        "_avpx_status_value@OData.Community.Display.V1.FormattedValue": "New",
        "_avpx_status_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "avpx_Status",
        "_avpx_status_value@Microsoft.Dynamics.CRM.lookuplogicalname": "avpx_ticketstatus",
        "_avpx_status_value": "571ec35a-080c-ed11-b83d-002248ae415b",
        "avpx_brl_country": "India",
        "_ownerid_value@OData.Community.Display.V1.FormattedValue": "Prexa User 1",
        "_ownerid_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "ownerid",
        "_ownerid_value@Microsoft.Dynamics.CRM.lookuplogicalname": "systemuser",
        "_ownerid_value": "22ba5948-63d9-ed11-a7c6-000d3a0a2267",
        "modifiedon@OData.Community.Display.V1.FormattedValue": "4/27/2024 8:01 PM",
        "modifiedon": "2024-04-27T14:31:05Z",
        "avpx_brl_streetaddress": "123 Sun Villa Society Lane",
        "avpx_jsl_ccountry": "Canada",
        "avpx_ticketno": "1012",
        "avpx_savetodocuments@OData.Community.Display.V1.FormattedValue": "Yes",
        "avpx_savetodocuments": true,
        "avpx_jsl_stateorprovince": "Ontario",
        "avpx_dispatchdate@OData.Community.Display.V1.FormattedValue": "5/4/2024 8:00 AM",
        "avpx_dispatchdate": "2024-05-04T02:30:00Z",
        "_owningbusinessunit_value@OData.Community.Display.V1.FormattedValue": "prexatrials2",
        "_owningbusinessunit_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "owningbusinessunit",
        "_owningbusinessunit_value@Microsoft.Dynamics.CRM.lookuplogicalname": "businessunit",
        "_owningbusinessunit_value": "8a68e5dd-06a5-ed11-aacf-000d3a09c725",
        "_avpx_driver_value@OData.Community.Display.V1.FormattedValue": "Nadia S",
        "_avpx_driver_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "avpx_Driver",
        "_avpx_driver_value@Microsoft.Dynamics.CRM.lookuplogicalname": "contact",
        "_avpx_driver_value": "f2bda5a9-4b02-ef11-9f8a-000d3a0a2484",
        "avpx_tickettype@OData.Community.Display.V1.FormattedValue": "Inhouse",
        "avpx_tickettype": 783090000,
        "avpx_brl_postalcode": "380052",
        "statecode@OData.Community.Display.V1.FormattedValue": "Active",
        "statecode": 0,
        "avpx_brl_stateorprovince": "Gujarat",
        "avpx_branchaddress": "123 Sun Villa Society Lane\nAhmedabad\nGujarat\n380052\nIndia",
        "avpx_jsl_streetaddress": "2233 Argentia Rd",
        "avpx_name": "DP - 1012",
        "avpx_jsl_city": "Mississauga",
        "avpx_jsl_postalcode": "L5N 2X7",
        "_avpx_rentalorder_value@OData.Community.Display.V1.FormattedValue": "RC - 1048",
        "_avpx_rentalorder_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "avpx_RentalOrder",
        "_avpx_rentalorder_value@Microsoft.Dynamics.CRM.lookuplogicalname": "avpx_rentalreservation",
        "_avpx_rentalorder_value": "5ed8b738-a204-ef11-9f8a-000d3a0a2484",
        "createdon@OData.Community.Display.V1.FormattedValue": "4/27/2024 8:00 PM",
        "createdon": "2024-04-27T14:30:31Z",
        "avpx_transporttype@OData.Community.Display.V1.FormattedValue": "Dispatch",
        "avpx_transporttype": 783090000,
        "avpx_ticketid": "4f1d0db3-a204-ef11-9f8a-000d3a0a2484"
    },
    {
        "@odata.etag": "W/\"12749614\"",
        "statuscode@OData.Community.Display.V1.FormattedValue": "Active",
        "statuscode": 1,
        "_createdby_value@OData.Community.Display.V1.FormattedValue": "Prexa User 2",
        "_createdby_value@Microsoft.Dynamics.CRM.lookuplogicalname": "systemuser",
        "_createdby_value": "7a746e73-33da-ed11-a7c6-000d3a0a2267",
        "_modifiedby_value@OData.Community.Display.V1.FormattedValue": "Prexa User 2",
        "_modifiedby_value@Microsoft.Dynamics.CRM.lookuplogicalname": "systemuser",
        "_modifiedby_value": "7a746e73-33da-ed11-a7c6-000d3a0a2267",
        "_avpx_status_value@OData.Community.Display.V1.FormattedValue": "New",
        "_avpx_status_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "avpx_Status",
        "_avpx_status_value@Microsoft.Dynamics.CRM.lookuplogicalname": "avpx_ticketstatus",
        "_avpx_status_value": "571ec35a-080c-ed11-b83d-002248ae415b",
        "_ownerid_value@OData.Community.Display.V1.FormattedValue": "Prexa User 2",
        "_ownerid_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "ownerid",
        "_ownerid_value@Microsoft.Dynamics.CRM.lookuplogicalname": "systemuser",
        "_ownerid_value": "7a746e73-33da-ed11-a7c6-000d3a0a2267",
        "avpx_distancekm@OData.Community.Display.V1.FormattedValue": "4,338.80",
        "avpx_distancekm": 4338.8,
        "modifiedon@OData.Community.Display.V1.FormattedValue": "4/27/2024 3:09 AM",
        "modifiedon": "2024-04-26T21:39:47Z",
        "avpx_jsl_ccountry": "United States",
        "avpx_ticketno": "1011",
        "avpx_savetodocuments@OData.Community.Display.V1.FormattedValue": "No",
        "avpx_savetodocuments": false,
        "avpx_jsl_stateorprovince": "Oregon",
        "avpx_pickupdate@OData.Community.Display.V1.FormattedValue": "4/27/2024 5:30 AM",
        "avpx_pickupdate": "2024-04-27T00:00:00Z",
        "_owningbusinessunit_value@OData.Community.Display.V1.FormattedValue": "prexatrials2",
        "_owningbusinessunit_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "owningbusinessunit",
        "_owningbusinessunit_value@Microsoft.Dynamics.CRM.lookuplogicalname": "businessunit",
        "_owningbusinessunit_value": "8a68e5dd-06a5-ed11-aacf-000d3a09c725",
        "statecode@OData.Community.Display.V1.FormattedValue": "Active",
        "statecode": 0,
        "avpx_branchaddress": "\r\n2233 Argentia Rd\r\nMississauga\r\nOntario\r\nL5N 2X7\r\nCanada ",
        "avpx_jsl_streetaddress": "87945 Territorial Hwy",
        "avpx_name": "PU - 1011",
        "avpx_jsl_city": "Veneta",
        "avpx_distance@OData.Community.Display.V1.FormattedValue": "2,696.01",
        "avpx_distance": 2696.01,
        "avpx_jsl_postalcode": "97487",
        "_avpx_rentalorder_value@OData.Community.Display.V1.FormattedValue": "RC - 1043",
        "_avpx_rentalorder_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "avpx_RentalOrder",
        "_avpx_rentalorder_value@Microsoft.Dynamics.CRM.lookuplogicalname": "avpx_rentalreservation",
        "_avpx_rentalorder_value": "e467208b-0e04-ef11-9f89-6045bdcd6a83",
        "createdon@OData.Community.Display.V1.FormattedValue": "4/27/2024 3:09 AM",
        "createdon": "2024-04-26T21:39:47Z",
        "avpx_transporttype@OData.Community.Display.V1.FormattedValue": "Pickup",
        "avpx_transporttype": 783090001,
        "avpx_ticketid": "d3dcd77f-1504-ef11-9f89-6045bdcd6a83"
    },
    {
        "@odata.etag": "W/\"12749575\"",
        "avpx_brl_city": "Veneta",
        "_avpx_transportorganisation_value@OData.Community.Display.V1.FormattedValue": "Vendor",
        "_avpx_transportorganisation_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "avpx_TransportOrganisation",
        "_avpx_transportorganisation_value@Microsoft.Dynamics.CRM.lookuplogicalname": "account",
        "_avpx_transportorganisation_value": "3fd1eec7-b903-ef11-9f89-6045bdcd6a83",
        "statuscode@OData.Community.Display.V1.FormattedValue": "Active",
        "statuscode": 1,
        "avpx_jobsiteaddress": "\r\n2233 Argentia Rd\r\nMississauga\r\nOntario\r\nL5N 2X7\r\nCanada ",
        "_createdby_value@OData.Community.Display.V1.FormattedValue": "Prexa User 2",
        "_createdby_value@Microsoft.Dynamics.CRM.lookuplogicalname": "systemuser",
        "_createdby_value": "7a746e73-33da-ed11-a7c6-000d3a0a2267",
        "avpx_driverdetails": "john/654632131",
        "_modifiedby_value@OData.Community.Display.V1.FormattedValue": "Prexa User 2",
        "_modifiedby_value@Microsoft.Dynamics.CRM.lookuplogicalname": "systemuser",
        "_modifiedby_value": "7a746e73-33da-ed11-a7c6-000d3a0a2267",
        "_avpx_status_value@OData.Community.Display.V1.FormattedValue": "New",
        "_avpx_status_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "avpx_Status",
        "_avpx_status_value@Microsoft.Dynamics.CRM.lookuplogicalname": "avpx_ticketstatus",
        "_avpx_status_value": "571ec35a-080c-ed11-b83d-002248ae415b",
        "avpx_brl_country": "United States",
        "_ownerid_value@OData.Community.Display.V1.FormattedValue": "Prexa User 2",
        "_ownerid_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "ownerid",
        "_ownerid_value@Microsoft.Dynamics.CRM.lookuplogicalname": "systemuser",
        "_ownerid_value": "7a746e73-33da-ed11-a7c6-000d3a0a2267",
        "avpx_distancekm@OData.Community.Display.V1.FormattedValue": "4,338.80",
        "avpx_distancekm": 4338.8,
        "modifiedon@OData.Community.Display.V1.FormattedValue": "4/27/2024 3:00 AM",
        "modifiedon": "2024-04-26T21:30:18Z",
        "avpx_brl_streetaddress": "87945 Territorial Hwy",
        "avpx_jsl_ccountry": "Canada",
        "avpx_type@OData.Community.Display.V1.FormattedValue": "Haul",
        "avpx_type": 783090001,
        "avpx_ticketno": "1010",
        "avpx_savetodocuments@OData.Community.Display.V1.FormattedValue": "No",
        "avpx_savetodocuments": false,
        "avpx_jsl_stateorprovince": "Ontario",
        "avpx_dispatchdate@OData.Community.Display.V1.FormattedValue": "4/27/2024 5:30 PM",
        "avpx_dispatchdate": "2024-04-27T12:00:00Z",
        "_owningbusinessunit_value@OData.Community.Display.V1.FormattedValue": "prexatrials2",
        "_owningbusinessunit_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "owningbusinessunit",
        "_owningbusinessunit_value@Microsoft.Dynamics.CRM.lookuplogicalname": "businessunit",
        "_owningbusinessunit_value": "8a68e5dd-06a5-ed11-aacf-000d3a09c725",
        "avpx_tickettype@OData.Community.Display.V1.FormattedValue": "Outsourced",
        "avpx_tickettype": 783090001,
        "avpx_brl_postalcode": "97487",
        "statecode@OData.Community.Display.V1.FormattedValue": "Active",
        "statecode": 0,
        "avpx_deliverydatefrom@OData.Community.Display.V1.FormattedValue": "4/27/2024 5:30 PM",
        "avpx_deliverydatefrom": "2024-04-27T12:00:00Z",
        "avpx_brl_stateorprovince": "Oregon",
        "avpx_branchaddress": "87945 Territorial Hwy\nVeneta\nOregon\n97487\nUnited States",
        "avpx_jsl_streetaddress": "2233 Argentia Rd",
        "avpx_name": "DP - 1010",
        "avpx_jsl_city": "Mississauga",
        "avpx_deliverydateto@OData.Community.Display.V1.FormattedValue": "4/27/2024 7:30 PM",
        "avpx_deliverydateto": "2024-04-27T14:00:00Z",
        "avpx_distance@OData.Community.Display.V1.FormattedValue": "2,696.01",
        "avpx_distance": 2696.01,
        "avpx_jsl_postalcode": "L5N 2X7",
        "_avpx_rentalorder_value@OData.Community.Display.V1.FormattedValue": "RC - 1043",
        "_avpx_rentalorder_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "avpx_RentalOrder",
        "_avpx_rentalorder_value@Microsoft.Dynamics.CRM.lookuplogicalname": "avpx_rentalreservation",
        "_avpx_rentalorder_value": "e467208b-0e04-ef11-9f89-6045bdcd6a83",
        "createdon@OData.Community.Display.V1.FormattedValue": "4/27/2024 3:00 AM",
        "createdon": "2024-04-26T21:30:17Z",
        "avpx_transporttype@OData.Community.Display.V1.FormattedValue": "Dispatch",
        "avpx_transporttype": 783090000,
        "avpx_ticketid": "cd0b6329-1404-ef11-9f89-6045bdcd6a83"
    },
    {
        "@odata.etag": "W/\"12759721\"",
        "avpx_brl_city": "Veneta",
        "statuscode@OData.Community.Display.V1.FormattedValue": "Active",
        "statuscode": 1,
        "avpx_jobsiteaddress": "\r\n2233 Argentia Rd\r\nMississauga\r\nOntario\r\nL5N 2X7\r\nCanada ",
        "_createdby_value@OData.Community.Display.V1.FormattedValue": "Prexa User 2",
        "_createdby_value@Microsoft.Dynamics.CRM.lookuplogicalname": "systemuser",
        "_createdby_value": "7a746e73-33da-ed11-a7c6-000d3a0a2267",
        "avpx_driverdetails": "dc",
        "_modifiedby_value@OData.Community.Display.V1.FormattedValue": "Prexa Trial",
        "_modifiedby_value@Microsoft.Dynamics.CRM.lookuplogicalname": "systemuser",
        "_modifiedby_value": "7c6fe5dd-06a5-ed11-aacf-000d3a09c725",
        "_avpx_status_value@OData.Community.Display.V1.FormattedValue": "New",
        "_avpx_status_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "avpx_Status",
        "_avpx_status_value@Microsoft.Dynamics.CRM.lookuplogicalname": "avpx_ticketstatus",
        "_avpx_status_value": "571ec35a-080c-ed11-b83d-002248ae415b",
        "avpx_brl_country": "United States",
        "_ownerid_value@OData.Community.Display.V1.FormattedValue": "Prexa User 2",
        "_ownerid_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "ownerid",
        "_ownerid_value@Microsoft.Dynamics.CRM.lookuplogicalname": "systemuser",
        "_ownerid_value": "7a746e73-33da-ed11-a7c6-000d3a0a2267",
        "avpx_distancekm@OData.Community.Display.V1.FormattedValue": "4,338.80",
        "avpx_distancekm": 4338.8,
        "modifiedon@OData.Community.Display.V1.FormattedValue": "4/27/2024 6:39 PM",
        "modifiedon": "2024-04-27T13:09:22Z",
        "avpx_purpose": "645132",
        "avpx_brl_streetaddress": "87945 Territorial Hwy",
        "avpx_jsl_ccountry": "Canada",
        "avpx_type@OData.Community.Display.V1.FormattedValue": "Drive",
        "avpx_type": 783090000,
        "avpx_ticketno": "1009",
        "avpx_savetodocuments@OData.Community.Display.V1.FormattedValue": "Yes",
        "avpx_savetodocuments": true,
        "avpx_jsl_stateorprovince": "Ontario",
        "avpx_dispatchdate@OData.Community.Display.V1.FormattedValue": "4/27/2024 5:30 PM",
        "avpx_dispatchdate": "2024-04-27T12:00:00Z",
        "_owningbusinessunit_value@OData.Community.Display.V1.FormattedValue": "prexatrials2",
        "_owningbusinessunit_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "owningbusinessunit",
        "_owningbusinessunit_value@Microsoft.Dynamics.CRM.lookuplogicalname": "businessunit",
        "_owningbusinessunit_value": "8a68e5dd-06a5-ed11-aacf-000d3a09c725",
        "_avpx_driver_value@OData.Community.Display.V1.FormattedValue": "Nadia S",
        "_avpx_driver_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "avpx_Driver",
        "_avpx_driver_value@Microsoft.Dynamics.CRM.lookuplogicalname": "contact",
        "_avpx_driver_value": "f2bda5a9-4b02-ef11-9f8a-000d3a0a2484",
        "avpx_tickettype@OData.Community.Display.V1.FormattedValue": "Inhouse",
        "avpx_tickettype": 783090000,
        "avpx_brl_postalcode": "97487",
        "statecode@OData.Community.Display.V1.FormattedValue": "Active",
        "statecode": 0,
        "avpx_deliverydatefrom@OData.Community.Display.V1.FormattedValue": "4/27/2024 5:30 PM",
        "avpx_deliverydatefrom": "2024-04-27T12:00:00Z",
        "avpx_brl_stateorprovince": "Oregon",
        "avpx_branchaddress": "87945 Territorial Hwy\nVeneta\nOregon\n97487\nUnited States",
        "avpx_jsl_streetaddress": "2233 Argentia Rd",
        "avpx_name": "DP - 1009",
        "avpx_jsl_city": "Mississauga",
        "avpx_deliverydateto@OData.Community.Display.V1.FormattedValue": "4/27/2024 7:30 PM",
        "avpx_deliverydateto": "2024-04-27T14:00:00Z",
        "avpx_distance@OData.Community.Display.V1.FormattedValue": "2,696.01",
        "avpx_distance": 2696.01,
        "avpx_jsl_postalcode": "L5N 2X7",
        "_avpx_rentalorder_value@OData.Community.Display.V1.FormattedValue": "RC - 1043",
        "_avpx_rentalorder_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "avpx_RentalOrder",
        "_avpx_rentalorder_value@Microsoft.Dynamics.CRM.lookuplogicalname": "avpx_rentalreservation",
        "_avpx_rentalorder_value": "e467208b-0e04-ef11-9f89-6045bdcd6a83",
        "createdon@OData.Community.Display.V1.FormattedValue": "4/27/2024 2:58 AM",
        "createdon": "2024-04-26T21:28:35Z",
        "avpx_transporttype@OData.Community.Display.V1.FormattedValue": "Dispatch",
        "avpx_transporttype": 783090000,
        "avpx_ticketid": "f20ba0ef-1304-ef11-9f89-6045bdcd6a83"
    },
    {
        "@odata.etag": "W/\"12747855\"",
        "avpx_brl_city": "Ahmedabad",
        "statuscode@OData.Community.Display.V1.FormattedValue": "Active",
        "statuscode": 1,
        "avpx_jobsiteaddress": "\r\n2233 Argentia Rd\r\nMississauga\r\nOntario\r\nL5N 2X7\r\nCanada ",
        "_createdby_value@OData.Community.Display.V1.FormattedValue": "Prexa Trial",
        "_createdby_value@Microsoft.Dynamics.CRM.lookuplogicalname": "systemuser",
        "_createdby_value": "7c6fe5dd-06a5-ed11-aacf-000d3a09c725",
        "_modifiedby_value@OData.Community.Display.V1.FormattedValue": "Prexa Trial",
        "_modifiedby_value@Microsoft.Dynamics.CRM.lookuplogicalname": "systemuser",
        "_modifiedby_value": "7c6fe5dd-06a5-ed11-aacf-000d3a09c725",
        "_avpx_status_value@OData.Community.Display.V1.FormattedValue": "New",
        "_avpx_status_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "avpx_Status",
        "_avpx_status_value@Microsoft.Dynamics.CRM.lookuplogicalname": "avpx_ticketstatus",
        "_avpx_status_value": "571ec35a-080c-ed11-b83d-002248ae415b",
        "avpx_brl_country": "India",
        "_ownerid_value@OData.Community.Display.V1.FormattedValue": "Prexa Trial",
        "_ownerid_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "ownerid",
        "_ownerid_value@Microsoft.Dynamics.CRM.lookuplogicalname": "systemuser",
        "_ownerid_value": "7c6fe5dd-06a5-ed11-aacf-000d3a09c725",
        "modifiedon@OData.Community.Display.V1.FormattedValue": "4/27/2024 12:58 AM",
        "modifiedon": "2024-04-26T19:28:55Z",
        "avpx_brl_streetaddress": "234 Krishna Bunglows Road",
        "avpx_jsl_ccountry": "Canada",
        "avpx_ticketno": "1008",
        "avpx_savetodocuments@OData.Community.Display.V1.FormattedValue": "Yes",
        "avpx_savetodocuments": true,
        "avpx_jsl_stateorprovince": "Ontario",
        "avpx_dispatchdate@OData.Community.Display.V1.FormattedValue": "4/27/2024 8:00 AM",
        "avpx_dispatchdate": "2024-04-27T02:30:00Z",
        "_owningbusinessunit_value@OData.Community.Display.V1.FormattedValue": "prexatrials2",
        "_owningbusinessunit_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "owningbusinessunit",
        "_owningbusinessunit_value@Microsoft.Dynamics.CRM.lookuplogicalname": "businessunit",
        "_owningbusinessunit_value": "8a68e5dd-06a5-ed11-aacf-000d3a09c725",
        "_avpx_driver_value@OData.Community.Display.V1.FormattedValue": "Nadia S",
        "_avpx_driver_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "avpx_Driver",
        "_avpx_driver_value@Microsoft.Dynamics.CRM.lookuplogicalname": "contact",
        "_avpx_driver_value": "f2bda5a9-4b02-ef11-9f8a-000d3a0a2484",
        "avpx_tickettype@OData.Community.Display.V1.FormattedValue": "Inhouse",
        "avpx_tickettype": 783090000,
        "avpx_brl_postalcode": "382470",
        "statecode@OData.Community.Display.V1.FormattedValue": "Active",
        "statecode": 0,
        "avpx_brl_stateorprovince": "Gujarat",
        "avpx_branchaddress": "234 Krishna Bunglows Road\nAhmedabad\nGujarat\n382470\nIndia",
        "avpx_jsl_streetaddress": "2233 Argentia Rd",
        "avpx_name": "DP - 1008",
        "avpx_jsl_city": "Mississauga",
        "avpx_jsl_postalcode": "L5N 2X7",
        "_avpx_rentalorder_value@OData.Community.Display.V1.FormattedValue": "RC - 1042",
        "_avpx_rentalorder_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "avpx_RentalOrder",
        "_avpx_rentalorder_value@Microsoft.Dynamics.CRM.lookuplogicalname": "avpx_rentalreservation",
        "_avpx_rentalorder_value": "0f724e64-0204-ef11-9f8a-000d3a0a2484",
        "createdon@OData.Community.Display.V1.FormattedValue": "4/27/2024 12:54 AM",
        "createdon": "2024-04-26T19:24:43Z",
        "avpx_transporttype@OData.Community.Display.V1.FormattedValue": "Dispatch",
        "avpx_transporttype": 783090000,
        "avpx_ticketid": "61cdfd9d-0204-ef11-9f8a-000d3a0a2484"
    },
    {
        "@odata.etag": "W/\"12738829\"",
        "statuscode@OData.Community.Display.V1.FormattedValue": "Active",
        "statuscode": 1,
        "_createdby_value@OData.Community.Display.V1.FormattedValue": "Prexa Trial",
        "_createdby_value@Microsoft.Dynamics.CRM.lookuplogicalname": "systemuser",
        "_createdby_value": "7c6fe5dd-06a5-ed11-aacf-000d3a09c725",
        "_modifiedby_value@OData.Community.Display.V1.FormattedValue": "Prexa Trial",
        "_modifiedby_value@Microsoft.Dynamics.CRM.lookuplogicalname": "systemuser",
        "_modifiedby_value": "7c6fe5dd-06a5-ed11-aacf-000d3a09c725",
        "_avpx_status_value@OData.Community.Display.V1.FormattedValue": "New",
        "_avpx_status_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "avpx_Status",
        "_avpx_status_value@Microsoft.Dynamics.CRM.lookuplogicalname": "avpx_ticketstatus",
        "_avpx_status_value": "571ec35a-080c-ed11-b83d-002248ae415b",
        "_ownerid_value@OData.Community.Display.V1.FormattedValue": "Prexa Trial",
        "_ownerid_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "ownerid",
        "_ownerid_value@Microsoft.Dynamics.CRM.lookuplogicalname": "systemuser",
        "_ownerid_value": "7c6fe5dd-06a5-ed11-aacf-000d3a09c725",
        "modifiedon@OData.Community.Display.V1.FormattedValue": "4/26/2024 4:11 PM",
        "modifiedon": "2024-04-26T10:41:29Z",
        "avpx_jsl_ccountry": "India",
        "avpx_ticketno": "1007",
        "avpx_savetodocuments@OData.Community.Display.V1.FormattedValue": "No",
        "avpx_savetodocuments": false,
        "avpx_jsl_stateorprovince": "Gujarat",
        "avpx_pickupdate@OData.Community.Display.V1.FormattedValue": "4/27/2024 5:30 AM",
        "avpx_pickupdate": "2024-04-27T00:00:00Z",
        "_owningbusinessunit_value@OData.Community.Display.V1.FormattedValue": "prexatrials2",
        "_owningbusinessunit_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "owningbusinessunit",
        "_owningbusinessunit_value@Microsoft.Dynamics.CRM.lookuplogicalname": "businessunit",
        "_owningbusinessunit_value": "8a68e5dd-06a5-ed11-aacf-000d3a09c725",
        "statecode@OData.Community.Display.V1.FormattedValue": "Active",
        "statecode": 0,
        "avpx_branchaddress": "\r\n2233 Argentia Rd\r\nMississauga\r\nOntario\r\nL5N 2X7\r\nCanada ",
        "avpx_jsl_streetaddress": "456 Haja Patel Ni Pole Road",
        "avpx_name": "PU - 1007",
        "avpx_jsl_city": "Ahmedabad",
        "avpx_jsl_postalcode": "380001",
        "_avpx_rentalorder_value@OData.Community.Display.V1.FormattedValue": "RC - 1041",
        "_avpx_rentalorder_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "avpx_RentalOrder",
        "_avpx_rentalorder_value@Microsoft.Dynamics.CRM.lookuplogicalname": "avpx_rentalreservation",
        "_avpx_rentalorder_value": "b5697c54-b903-ef11-9f89-6045bdcd6a83",
        "createdon@OData.Community.Display.V1.FormattedValue": "4/26/2024 4:11 PM",
        "createdon": "2024-04-26T10:41:29Z",
        "avpx_transporttype@OData.Community.Display.V1.FormattedValue": "Pickup",
        "avpx_transporttype": 783090001,
        "avpx_ticketid": "fb407d88-b903-ef11-9f89-6045bdcd6a83"
    },
    {
        "@odata.etag": "W/\"12737952\"",
        "statuscode@OData.Community.Display.V1.FormattedValue": "Active",
        "statuscode": 1,
        "_createdby_value@OData.Community.Display.V1.FormattedValue": "Prexa Trial",
        "_createdby_value@Microsoft.Dynamics.CRM.lookuplogicalname": "systemuser",
        "_createdby_value": "7c6fe5dd-06a5-ed11-aacf-000d3a09c725",
        "_modifiedby_value@OData.Community.Display.V1.FormattedValue": "Prexa Trial",
        "_modifiedby_value@Microsoft.Dynamics.CRM.lookuplogicalname": "systemuser",
        "_modifiedby_value": "7c6fe5dd-06a5-ed11-aacf-000d3a09c725",
        "_avpx_status_value@OData.Community.Display.V1.FormattedValue": "New",
        "_avpx_status_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "avpx_Status",
        "_avpx_status_value@Microsoft.Dynamics.CRM.lookuplogicalname": "avpx_ticketstatus",
        "_avpx_status_value": "571ec35a-080c-ed11-b83d-002248ae415b",
        "_ownerid_value@OData.Community.Display.V1.FormattedValue": "Prexa Trial",
        "_ownerid_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "ownerid",
        "_ownerid_value@Microsoft.Dynamics.CRM.lookuplogicalname": "systemuser",
        "_ownerid_value": "7c6fe5dd-06a5-ed11-aacf-000d3a09c725",
        "modifiedon@OData.Community.Display.V1.FormattedValue": "4/26/2024 4:06 PM",
        "modifiedon": "2024-04-26T10:36:01Z",
        "avpx_jsl_ccountry": "India",
        "avpx_ticketno": "1006",
        "avpx_savetodocuments@OData.Community.Display.V1.FormattedValue": "No",
        "avpx_savetodocuments": false,
        "avpx_jsl_stateorprovince": "Gujarat",
        "avpx_pickupdate@OData.Community.Display.V1.FormattedValue": "4/30/2024 5:30 AM",
        "avpx_pickupdate": "2024-04-30T00:00:00Z",
        "_owningbusinessunit_value@OData.Community.Display.V1.FormattedValue": "prexatrials2",
        "_owningbusinessunit_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "owningbusinessunit",
        "_owningbusinessunit_value@Microsoft.Dynamics.CRM.lookuplogicalname": "businessunit",
        "_owningbusinessunit_value": "8a68e5dd-06a5-ed11-aacf-000d3a09c725",
        "statecode@OData.Community.Display.V1.FormattedValue": "Active",
        "statecode": 0,
        "avpx_branchaddress": "\r\n2233 Argentia Rd\r\nMississauga\r\nOntario\r\nL5N 2X7\r\nCanada ",
        "avpx_jsl_streetaddress": "324 Shree Arvind Marg",
        "avpx_name": "PU - 1006",
        "avpx_jsl_city": "Ahmedabad",
        "avpx_jsl_postalcode": "380009",
        "_avpx_rentalorder_value@OData.Community.Display.V1.FormattedValue": "RC - 1040",
        "_avpx_rentalorder_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "avpx_RentalOrder",
        "_avpx_rentalorder_value@Microsoft.Dynamics.CRM.lookuplogicalname": "avpx_rentalreservation",
        "_avpx_rentalorder_value": "74d16578-b803-ef11-9f89-6045bdcd6a83",
        "createdon@OData.Community.Display.V1.FormattedValue": "4/26/2024 4:06 PM",
        "createdon": "2024-04-26T10:36:00Z",
        "avpx_transporttype@OData.Community.Display.V1.FormattedValue": "Pickup",
        "avpx_transporttype": 783090001,
        "avpx_ticketid": "80c8c1c4-b803-ef11-9f89-6045bdcd6a83"
    },
    {
        "@odata.etag": "W/\"12736705\"",
        "statuscode@OData.Community.Display.V1.FormattedValue": "Active",
        "statuscode": 1,
        "_createdby_value@OData.Community.Display.V1.FormattedValue": "Prexa Trial",
        "_createdby_value@Microsoft.Dynamics.CRM.lookuplogicalname": "systemuser",
        "_createdby_value": "7c6fe5dd-06a5-ed11-aacf-000d3a09c725",
        "_modifiedby_value@OData.Community.Display.V1.FormattedValue": "Prexa Trial",
        "_modifiedby_value@Microsoft.Dynamics.CRM.lookuplogicalname": "systemuser",
        "_modifiedby_value": "7c6fe5dd-06a5-ed11-aacf-000d3a09c725",
        "_avpx_status_value@OData.Community.Display.V1.FormattedValue": "New",
        "_avpx_status_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "avpx_Status",
        "_avpx_status_value@Microsoft.Dynamics.CRM.lookuplogicalname": "avpx_ticketstatus",
        "_avpx_status_value": "571ec35a-080c-ed11-b83d-002248ae415b",
        "_ownerid_value@OData.Community.Display.V1.FormattedValue": "Prexa Trial",
        "_ownerid_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "ownerid",
        "_ownerid_value@Microsoft.Dynamics.CRM.lookuplogicalname": "systemuser",
        "_ownerid_value": "7c6fe5dd-06a5-ed11-aacf-000d3a09c725",
        "modifiedon@OData.Community.Display.V1.FormattedValue": "4/26/2024 4:00 PM",
        "modifiedon": "2024-04-26T10:30:51Z",
        "avpx_jsl_ccountry": "India",
        "avpx_ticketno": "1005",
        "avpx_savetodocuments@OData.Community.Display.V1.FormattedValue": "No",
        "avpx_savetodocuments": false,
        "avpx_jsl_stateorprovince": "Gujarat",
        "avpx_pickupdate@OData.Community.Display.V1.FormattedValue": "4/30/2024 5:30 AM",
        "avpx_pickupdate": "2024-04-30T00:00:00Z",
        "_owningbusinessunit_value@OData.Community.Display.V1.FormattedValue": "prexatrials2",
        "_owningbusinessunit_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "owningbusinessunit",
        "_owningbusinessunit_value@Microsoft.Dynamics.CRM.lookuplogicalname": "businessunit",
        "_owningbusinessunit_value": "8a68e5dd-06a5-ed11-aacf-000d3a09c725",
        "statecode@OData.Community.Display.V1.FormattedValue": "Active",
        "statecode": 0,
        "avpx_branchaddress": "\r\n2233 Argentia Rd\r\nMississauga\r\nOntario\r\nL5N 2X7\r\nCanada ",
        "avpx_jsl_streetaddress": "345 Azad Road",
        "avpx_name": "PU - 1005",
        "avpx_jsl_city": "Ahmedabad",
        "avpx_jsl_postalcode": "380061",
        "_avpx_rentalorder_value@OData.Community.Display.V1.FormattedValue": "RC - 1038",
        "_avpx_rentalorder_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "avpx_RentalOrder",
        "_avpx_rentalorder_value@Microsoft.Dynamics.CRM.lookuplogicalname": "avpx_rentalreservation",
        "_avpx_rentalorder_value": "6c850f84-b703-ef11-9f89-6045bdcd6a83",
        "createdon@OData.Community.Display.V1.FormattedValue": "4/26/2024 4:00 PM",
        "createdon": "2024-04-26T10:30:51Z",
        "avpx_transporttype@OData.Community.Display.V1.FormattedValue": "Pickup",
        "avpx_transporttype": 783090001,
        "avpx_ticketid": "d067ae0b-b803-ef11-9f89-6045bdcd6a83"
    },
    {
        "@odata.etag": "W/\"12713564\"",
        "avpx_brl_city": "Mississauga",
        "statuscode@OData.Community.Display.V1.FormattedValue": "Active",
        "statuscode": 1,
        "avpx_jobsiteaddress": "\r\n2233 Argentia Rd\r\nMississauga\r\nOntario\r\nL5N 2X7\r\nCanada ",
        "_createdby_value@OData.Community.Display.V1.FormattedValue": "Prexa User 2",
        "_createdby_value@Microsoft.Dynamics.CRM.lookuplogicalname": "systemuser",
        "_createdby_value": "7a746e73-33da-ed11-a7c6-000d3a0a2267",
        "_modifiedby_value@OData.Community.Display.V1.FormattedValue": "Prexa User 2",
        "_modifiedby_value@Microsoft.Dynamics.CRM.lookuplogicalname": "systemuser",
        "_modifiedby_value": "7a746e73-33da-ed11-a7c6-000d3a0a2267",
        "_avpx_status_value@OData.Community.Display.V1.FormattedValue": "New",
        "_avpx_status_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "avpx_Status",
        "_avpx_status_value@Microsoft.Dynamics.CRM.lookuplogicalname": "avpx_ticketstatus",
        "_avpx_status_value": "571ec35a-080c-ed11-b83d-002248ae415b",
        "avpx_brl_country": "Canada",
        "_ownerid_value@OData.Community.Display.V1.FormattedValue": "Prexa User 2",
        "_ownerid_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "ownerid",
        "_ownerid_value@Microsoft.Dynamics.CRM.lookuplogicalname": "systemuser",
        "_ownerid_value": "7a746e73-33da-ed11-a7c6-000d3a0a2267",
        "avpx_distancekm@OData.Community.Display.V1.FormattedValue": "4.88",
        "avpx_distancekm": 4.88,
        "modifiedon@OData.Community.Display.V1.FormattedValue": "4/24/2024 8:32 PM",
        "modifiedon": "2024-04-24T15:02:48Z",
        "avpx_brl_streetaddress": "3158 Alfresco Terrace",
        "avpx_jsl_ccountry": "Canada",
        "avpx_ticketno": "1004",
        "avpx_savetodocuments@OData.Community.Display.V1.FormattedValue": "No",
        "avpx_savetodocuments": false,
        "avpx_jsl_stateorprovince": "Ontario",
        "avpx_dispatchdate@OData.Community.Display.V1.FormattedValue": "4/25/2024 5:30 PM",
        "avpx_dispatchdate": "2024-04-25T12:00:00Z",
        "_owningbusinessunit_value@OData.Community.Display.V1.FormattedValue": "prexatrials2",
        "_owningbusinessunit_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "owningbusinessunit",
        "_owningbusinessunit_value@Microsoft.Dynamics.CRM.lookuplogicalname": "businessunit",
        "_owningbusinessunit_value": "8a68e5dd-06a5-ed11-aacf-000d3a09c725",
        "_avpx_driver_value@OData.Community.Display.V1.FormattedValue": "Nadia S",
        "_avpx_driver_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "avpx_Driver",
        "_avpx_driver_value@Microsoft.Dynamics.CRM.lookuplogicalname": "contact",
        "_avpx_driver_value": "f2bda5a9-4b02-ef11-9f8a-000d3a0a2484",
        "avpx_tickettype@OData.Community.Display.V1.FormattedValue": "Inhouse",
        "avpx_tickettype": 783090000,
        "avpx_brl_postalcode": "L5N 4R9",
        "statecode@OData.Community.Display.V1.FormattedValue": "Active",
        "statecode": 0,
        "avpx_brl_stateorprovince": "Ontario",
        "avpx_branchaddress": "3158 Alfresco Terrace\nMississauga\nOntario\nL5N 4R9\nCanada",
        "avpx_jsl_streetaddress": "2233 Argentia Rd",
        "avpx_name": "DP - 1004",
        "avpx_jsl_city": "Mississauga",
        "avpx_distance@OData.Community.Display.V1.FormattedValue": "3.03",
        "avpx_distance": 3.03,
        "avpx_jsl_postalcode": "L5N 2X7",
        "_avpx_rentalorder_value@OData.Community.Display.V1.FormattedValue": "RC - 1036",
        "_avpx_rentalorder_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "avpx_RentalOrder",
        "_avpx_rentalorder_value@Microsoft.Dynamics.CRM.lookuplogicalname": "avpx_rentalreservation",
        "_avpx_rentalorder_value": "15e1702b-4802-ef11-9f8a-000d3a0a2484",
        "createdon@OData.Community.Display.V1.FormattedValue": "4/24/2024 8:32 PM",
        "createdon": "2024-04-24T15:02:45Z",
        "avpx_transporttype@OData.Community.Display.V1.FormattedValue": "Dispatch",
        "avpx_transporttype": 783090000,
        "avpx_ticketid": "6362fbaf-4b02-ef11-9f8a-000d3a0a2484"
    },
    {
        "@odata.etag": "W/\"12712295\"",
        "avpx_brl_city": "Mississauga",
        "statuscode@OData.Community.Display.V1.FormattedValue": "Active",
        "statuscode": 1,
        "avpx_jobsiteaddress": "Canyon Village\nTower Junction\nWyoming\n82190\nUnited States",
        "_createdby_value@OData.Community.Display.V1.FormattedValue": "Prexa Trial",
        "_createdby_value@Microsoft.Dynamics.CRM.lookuplogicalname": "systemuser",
        "_createdby_value": "7c6fe5dd-06a5-ed11-aacf-000d3a09c725",
        "avpx_driverdetails": "Test Driver",
        "_modifiedby_value@OData.Community.Display.V1.FormattedValue": "Prexa Trial",
        "_modifiedby_value@Microsoft.Dynamics.CRM.lookuplogicalname": "systemuser",
        "_modifiedby_value": "7c6fe5dd-06a5-ed11-aacf-000d3a09c725",
        "_avpx_status_value@OData.Community.Display.V1.FormattedValue": "New",
        "_avpx_status_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "avpx_Status",
        "_avpx_status_value@Microsoft.Dynamics.CRM.lookuplogicalname": "avpx_ticketstatus",
        "_avpx_status_value": "571ec35a-080c-ed11-b83d-002248ae415b",
        "avpx_brl_country": "Canada",
        "_ownerid_value@OData.Community.Display.V1.FormattedValue": "Prexa Trial",
        "_ownerid_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "ownerid",
        "_ownerid_value@Microsoft.Dynamics.CRM.lookuplogicalname": "systemuser",
        "_ownerid_value": "7c6fe5dd-06a5-ed11-aacf-000d3a09c725",
        "avpx_distancekm@OData.Community.Display.V1.FormattedValue": "3,085.68",
        "avpx_distancekm": 3085.68,
        "modifiedon@OData.Community.Display.V1.FormattedValue": "4/24/2024 4:20 PM",
        "modifiedon": "2024-04-24T10:50:27Z",
        "avpx_brl_streetaddress": "2233 Argentia Rd",
        "avpx_jsl_ccountry": "United States",
        "avpx_type@OData.Community.Display.V1.FormattedValue": "Drive",
        "avpx_type": 783090000,
        "avpx_ticketno": "1003",
        "avpx_savetodocuments@OData.Community.Display.V1.FormattedValue": "Yes",
        "avpx_savetodocuments": true,
        "avpx_jsl_stateorprovince": "Wyoming",
        "avpx_pickupdate@OData.Community.Display.V1.FormattedValue": "4/30/2024 8:00 AM",
        "avpx_pickupdate": "2024-04-30T02:30:00Z",
        "_owningbusinessunit_value@OData.Community.Display.V1.FormattedValue": "prexatrials2",
        "_owningbusinessunit_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "owningbusinessunit",
        "_owningbusinessunit_value@Microsoft.Dynamics.CRM.lookuplogicalname": "businessunit",
        "_owningbusinessunit_value": "8a68e5dd-06a5-ed11-aacf-000d3a09c725",
        "avpx_tickettype@OData.Community.Display.V1.FormattedValue": "Outsourced",
        "avpx_tickettype": 783090001,
        "avpx_brl_postalcode": "L5N 2X7",
        "statecode@OData.Community.Display.V1.FormattedValue": "Active",
        "statecode": 0,
        "avpx_brl_stateorprovince": "Ontario",
        "avpx_branchaddress": "\r\n2233 Argentia Rd\r\nMississauga\r\nOntario\r\nL5N 2X7\r\nCanada ",
        "avpx_jsl_streetaddress": "Canyon Village",
        "avpx_name": "PU - 1003",
        "avpx_jsl_city": "Tower Junction",
        "avpx_distance@OData.Community.Display.V1.FormattedValue": "1,917.36",
        "avpx_distance": 1917.36,
        "avpx_jsl_postalcode": "82190",
        "_avpx_rentalorder_value@OData.Community.Display.V1.FormattedValue": "RES - 1035",
        "_avpx_rentalorder_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "avpx_RentalOrder",
        "_avpx_rentalorder_value@Microsoft.Dynamics.CRM.lookuplogicalname": "avpx_rentalreservation",
        "_avpx_rentalorder_value": "03a5592e-2802-ef11-9f8a-000d3a0a2484",
        "createdon@OData.Community.Display.V1.FormattedValue": "4/24/2024 4:19 PM",
        "createdon": "2024-04-24T10:49:23Z",
        "avpx_transporttype@OData.Community.Display.V1.FormattedValue": "Pickup",
        "avpx_transporttype": 783090001,
        "avpx_ticketid": "e01aff4e-2802-ef11-9f8a-000d3a0a2484"
    },
    {
        "@odata.etag": "W/\"12345195\"",
        "avpx_brl_city": "Ahmedabad",
        "statuscode@OData.Community.Display.V1.FormattedValue": "Active",
        "statuscode": 1,
        "avpx_jobsiteaddress": "\r\n2233 Argentia Rd\r\nMississauga\r\nOntario\r\nL5N 2X7\r\nCanada ",
        "_createdby_value@OData.Community.Display.V1.FormattedValue": "Prexa Trial",
        "_createdby_value@Microsoft.Dynamics.CRM.lookuplogicalname": "systemuser",
        "_createdby_value": "7c6fe5dd-06a5-ed11-aacf-000d3a09c725",
        "avpx_driverdetails": "sdfsdf",
        "_modifiedby_value@OData.Community.Display.V1.FormattedValue": "Prexa Trial",
        "_modifiedby_value@Microsoft.Dynamics.CRM.lookuplogicalname": "systemuser",
        "_modifiedby_value": "7c6fe5dd-06a5-ed11-aacf-000d3a09c725",
        "_avpx_status_value@OData.Community.Display.V1.FormattedValue": "New",
        "_avpx_status_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "avpx_Status",
        "_avpx_status_value@Microsoft.Dynamics.CRM.lookuplogicalname": "avpx_ticketstatus",
        "_avpx_status_value": "571ec35a-080c-ed11-b83d-002248ae415b",
        "avpx_brl_country": "India",
        "_ownerid_value@OData.Community.Display.V1.FormattedValue": "Prexa Trial",
        "_ownerid_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "ownerid",
        "_ownerid_value@Microsoft.Dynamics.CRM.lookuplogicalname": "systemuser",
        "_ownerid_value": "7c6fe5dd-06a5-ed11-aacf-000d3a09c725",
        "modifiedon@OData.Community.Display.V1.FormattedValue": "4/23/2024 5:02 PM",
        "modifiedon": "2024-04-23T11:32:26Z",
        "avpx_brl_streetaddress": "123 Sun Villa Society Lane",
        "avpx_jsl_ccountry": "Canada",
        "avpx_ticketno": "1002",
        "avpx_savetodocuments@OData.Community.Display.V1.FormattedValue": "Yes",
        "avpx_savetodocuments": true,
        "avpx_jsl_stateorprovince": "Ontario",
        "avpx_dispatchdate@OData.Community.Display.V1.FormattedValue": "4/26/2024 8:00 AM",
        "avpx_dispatchdate": "2024-04-26T02:30:00Z",
        "_owningbusinessunit_value@OData.Community.Display.V1.FormattedValue": "prexatrials2",
        "_owningbusinessunit_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "owningbusinessunit",
        "_owningbusinessunit_value@Microsoft.Dynamics.CRM.lookuplogicalname": "businessunit",
        "_owningbusinessunit_value": "8a68e5dd-06a5-ed11-aacf-000d3a09c725",
        "avpx_tickettype@OData.Community.Display.V1.FormattedValue": "Outsourced",
        "avpx_tickettype": 783090001,
        "avpx_brl_postalcode": "380052",
        "statecode@OData.Community.Display.V1.FormattedValue": "Active",
        "statecode": 0,
        "avpx_brl_stateorprovince": "Gujarat",
        "avpx_branchaddress": "123 Sun Villa Society Lane\nAhmedabad\nGujarat\n380052\nIndia",
        "avpx_jsl_streetaddress": "2233 Argentia Rd",
        "avpx_name": "DP - 1002",
        "avpx_jsl_city": "Mississauga",
        "avpx_jsl_postalcode": "L5N 2X7",
        "_avpx_rentalorder_value@OData.Community.Display.V1.FormattedValue": "RES - 1029",
        "_avpx_rentalorder_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "avpx_RentalOrder",
        "_avpx_rentalorder_value@Microsoft.Dynamics.CRM.lookuplogicalname": "avpx_rentalreservation",
        "_avpx_rentalorder_value": "d45d88be-6401-ef11-9f8a-000d3a0a2484",
        "createdon@OData.Community.Display.V1.FormattedValue": "4/23/2024 5:00 PM",
        "createdon": "2024-04-23T11:30:20Z",
        "avpx_transporttype@OData.Community.Display.V1.FormattedValue": "Dispatch",
        "avpx_transporttype": 783090000,
        "avpx_ticketid": "f945aadd-6401-ef11-9f8a-000d3a0a2484"
    },
    {
        "@odata.etag": "W/\"12335941\"",
        "avpx_brl_city": "Brattleboro",
        "statuscode@OData.Community.Display.V1.FormattedValue": "Active",
        "statuscode": 1,
        "avpx_jobsiteaddress": "\r\n2233 Argentia Rd\r\nMississauga\r\nOntario\r\nL5N 2X7\r\nCanada ",
        "_createdby_value@OData.Community.Display.V1.FormattedValue": "Prexa Trial",
        "_createdby_value@Microsoft.Dynamics.CRM.lookuplogicalname": "systemuser",
        "_createdby_value": "7c6fe5dd-06a5-ed11-aacf-000d3a09c725",
        "avpx_driverdetails": "Test Driver",
        "_modifiedby_value@OData.Community.Display.V1.FormattedValue": "Prexa Trial",
        "_modifiedby_value@Microsoft.Dynamics.CRM.lookuplogicalname": "systemuser",
        "_modifiedby_value": "7c6fe5dd-06a5-ed11-aacf-000d3a09c725",
        "_avpx_status_value@OData.Community.Display.V1.FormattedValue": "New",
        "_avpx_status_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "avpx_Status",
        "_avpx_status_value@Microsoft.Dynamics.CRM.lookuplogicalname": "avpx_ticketstatus",
        "_avpx_status_value": "571ec35a-080c-ed11-b83d-002248ae415b",
        "avpx_brl_country": "United States",
        "_ownerid_value@OData.Community.Display.V1.FormattedValue": "Prexa Trial",
        "_ownerid_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "ownerid",
        "_ownerid_value@Microsoft.Dynamics.CRM.lookuplogicalname": "systemuser",
        "_ownerid_value": "7c6fe5dd-06a5-ed11-aacf-000d3a09c725",
        "avpx_distancekm@OData.Community.Display.V1.FormattedValue": "718.52",
        "avpx_distancekm": 718.52,
        "modifiedon@OData.Community.Display.V1.FormattedValue": "4/23/2024 2:27 PM",
        "modifiedon": "2024-04-23T08:57:11Z",
        "avpx_brl_streetaddress": "Canal St",
        "avpx_jsl_ccountry": "Canada",
        "avpx_type@OData.Community.Display.V1.FormattedValue": "Drive",
        "avpx_type": 783090000,
        "avpx_ticketno": "1001",
        "avpx_savetodocuments@OData.Community.Display.V1.FormattedValue": "Yes",
        "avpx_savetodocuments": true,
        "avpx_jsl_stateorprovince": "Ontario",
        "avpx_dispatchdate@OData.Community.Display.V1.FormattedValue": "4/24/2024 8:00 AM",
        "avpx_dispatchdate": "2024-04-24T02:30:00Z",
        "_owningbusinessunit_value@OData.Community.Display.V1.FormattedValue": "prexatrials2",
        "_owningbusinessunit_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "owningbusinessunit",
        "_owningbusinessunit_value@Microsoft.Dynamics.CRM.lookuplogicalname": "businessunit",
        "_owningbusinessunit_value": "8a68e5dd-06a5-ed11-aacf-000d3a09c725",
        "avpx_tickettype@OData.Community.Display.V1.FormattedValue": "Outsourced",
        "avpx_tickettype": 783090001,
        "avpx_brl_postalcode": "05301",
        "statecode@OData.Community.Display.V1.FormattedValue": "Active",
        "statecode": 0,
        "avpx_brl_stateorprovince": "Vermont",
        "avpx_branchaddress": "Canal St\nBrattleboro\nVermont\n05301\nUnited States",
        "avpx_jsl_streetaddress": "2233 Argentia Rd",
        "avpx_name": "DP - 1001",
        "avpx_jsl_city": "Mississauga",
        "avpx_distance@OData.Community.Display.V1.FormattedValue": "446.47",
        "avpx_distance": 446.47,
        "avpx_jsl_postalcode": "L5N 2X7",
        "_avpx_rentalorder_value@OData.Community.Display.V1.FormattedValue": "RES - 1027",
        "_avpx_rentalorder_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "avpx_RentalOrder",
        "_avpx_rentalorder_value@Microsoft.Dynamics.CRM.lookuplogicalname": "avpx_rentalreservation",
        "_avpx_rentalorder_value": "5a65beba-4d01-ef11-9f8a-000d3a0a2484",
        "createdon@OData.Community.Display.V1.FormattedValue": "4/23/2024 2:27 PM",
        "createdon": "2024-04-23T08:57:05Z",
        "avpx_transporttype@OData.Community.Display.V1.FormattedValue": "Dispatch",
        "avpx_transporttype": 783090000,
        "avpx_ticketid": "f84b8b74-4f01-ef11-9f8a-000d3a0a2484"
    },
    {
        "@odata.etag": "W/\"12045593\"",
        "avpx_brl_city": "Mississauga",
        "statuscode@OData.Community.Display.V1.FormattedValue": "Active",
        "statuscode": 1,
        "avpx_jobsiteaddress": "\r\n2233 Argentia Rd\r\nMississauga\r\nOntario\r\nL5N 2X7\r\nCanada ",
        "_createdby_value@OData.Community.Display.V1.FormattedValue": "Prexa Trial",
        "_createdby_value@Microsoft.Dynamics.CRM.lookuplogicalname": "systemuser",
        "_createdby_value": "7c6fe5dd-06a5-ed11-aacf-000d3a09c725",
        "avpx_driverdetails": "64512",
        "_modifiedby_value@OData.Community.Display.V1.FormattedValue": "Prexa Trial",
        "_modifiedby_value@Microsoft.Dynamics.CRM.lookuplogicalname": "systemuser",
        "_modifiedby_value": "7c6fe5dd-06a5-ed11-aacf-000d3a09c725",
        "_avpx_status_value@OData.Community.Display.V1.FormattedValue": "New",
        "_avpx_status_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "avpx_Status",
        "_avpx_status_value@Microsoft.Dynamics.CRM.lookuplogicalname": "avpx_ticketstatus",
        "_avpx_status_value": "571ec35a-080c-ed11-b83d-002248ae415b",
        "avpx_brl_country": "Canada",
        "_ownerid_value@OData.Community.Display.V1.FormattedValue": "Prexa Trial",
        "_ownerid_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "ownerid",
        "_ownerid_value@Microsoft.Dynamics.CRM.lookuplogicalname": "systemuser",
        "_ownerid_value": "7c6fe5dd-06a5-ed11-aacf-000d3a09c725",
        "avpx_distancekm@OData.Community.Display.V1.FormattedValue": "0.00",
        "avpx_distancekm": 0,
        "modifiedon@OData.Community.Display.V1.FormattedValue": "4/19/2024 11:41 PM",
        "modifiedon": "2024-04-19T18:11:54Z",
        "avpx_brl_streetaddress": "3158 Alfresco Terrace",
        "avpx_jsl_ccountry": "Canada",
        "avpx_type@OData.Community.Display.V1.FormattedValue": "Haul",
        "avpx_type": 783090001,
        "avpx_ticketno": "1000",
        "avpx_jsl_stateorprovince": "Ontario",
        "avpx_dispatchdate@OData.Community.Display.V1.FormattedValue": "4/19/2024 8:00 AM",
        "avpx_dispatchdate": "2024-04-19T02:30:00Z",
        "_owningbusinessunit_value@OData.Community.Display.V1.FormattedValue": "prexatrials2",
        "_owningbusinessunit_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "owningbusinessunit",
        "_owningbusinessunit_value@Microsoft.Dynamics.CRM.lookuplogicalname": "businessunit",
        "_owningbusinessunit_value": "8a68e5dd-06a5-ed11-aacf-000d3a09c725",
        "avpx_tickettype@OData.Community.Display.V1.FormattedValue": "Outsourced",
        "avpx_tickettype": 783090001,
        "avpx_brl_postalcode": "L5N 4R9",
        "statecode@OData.Community.Display.V1.FormattedValue": "Active",
        "statecode": 0,
        "avpx_deliverydatefrom@OData.Community.Display.V1.FormattedValue": "4/20/2024 8:00 AM",
        "avpx_deliverydatefrom": "2024-04-20T02:30:00Z",
        "avpx_brl_stateorprovince": "Ontario",
        "avpx_branchaddress": "3158 Alfresco Terrace\nMississauga\nOntario\nL5N 4R9\nCanada",
        "avpx_jsl_streetaddress": "2233 Argentia Rd",
        "avpx_name": "DP - 1000",
        "avpx_jsl_city": "Mississauga",
        "avpx_deliverydateto@OData.Community.Display.V1.FormattedValue": "4/20/2024 10:00 AM",
        "avpx_deliverydateto": "2024-04-20T04:30:00Z",
        "avpx_distance@OData.Community.Display.V1.FormattedValue": "0.00",
        "avpx_distance": 0,
        "avpx_jsl_postalcode": "L5N 2X7",
        "_avpx_rentalorder_value@OData.Community.Display.V1.FormattedValue": "RES - 1019",
        "_avpx_rentalorder_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "avpx_RentalOrder",
        "_avpx_rentalorder_value@Microsoft.Dynamics.CRM.lookuplogicalname": "avpx_rentalreservation",
        "_avpx_rentalorder_value": "2328997b-6efe-ee11-9f89-6045bdcd6a83",
        "createdon@OData.Community.Display.V1.FormattedValue": "4/19/2024 11:41 PM",
        "createdon": "2024-04-19T18:11:50Z",
        "avpx_transporttype@OData.Community.Display.V1.FormattedValue": "Dispatch",
        "avpx_transporttype": 783090000,
        "avpx_ticketid": "0d406648-78fe-ee11-9f89-6045bdcd6a83"
    }
]
function App() {
  const [dataverseData, setDataverseData] = useState<SchedulerRow[]>(
   []
);
const [selectedOption, setSelectedOption] = useState('')
const [selectedOptions, setSelectedOptions] = useState<string[]>([])
const options = [
    'New',
    'Scheduled',
    'Picked up',
    'On Route',
    'Complete',
    "Cancelled",
]
const [usedata, setUseData] = useState<SchedulerRow[]>([]);
  const [isLoading, setIsLoading] = useState(false);
const [filterButtonState, setFilterBtnState] = useState(0);
  const [values] = useState({
    peopleCount: 15,
    projectsPerYear: 5,
    yearsCovered: 0,
    startDate: undefined,
    maxRecordsPerPage: 50,
    isFullscreen: true,
  });
  // const { peopleCount, projectsPerYear, yearsCovered, isFullscreen, maxRecordsPerPage } = values;
//   // const mocked = useMemo(
//   //   () => createMockData(+peopleCount, +yearsCovered, +projectsPerYear),
//   //   [peopleCount, projectsPerYear, yearsCovered]
//   // );
// console.log(mocked)
  useEffect(() => {
    const fetchData = async () => {
      // -------------------------------
    //   const results = await dataRetrive();
      const transformedData = transformData(SampleData);
      console.log(transformedData, 'transformedData');
      // --------------------------------
      // Define or import your sample data here
      setDataverseData(transformedData);
      setUseData(transformedData);
      // const finalData =SampleData.map(item => ({
      //   ...item,
      //   data: item.data.map(project => ({
      //     ...project,
      //     startDate: new Date(project.startDate),
      //     endDate: new Date(project.endDate)
      //   }))
      // }))
      // setDataverseData(finalData);
      // console.log(transformedData, 'transformedData');
      setIsLoading(false)
    };
    fetchData();
  }, []);

  const [range, setRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const handleRangeChange = useCallback((range: ParsedDatesRange) => {
    setRange(range);
  }, []);

  const filteredData = useMemo(
    () =>
      // Filter data based on the range
    dataverseData?.map((person) => ({
        ...person,
        data: person.data.filter(
          (project) =>
            dayjs(project.startDate).isBetween(range.startDate, range.endDate) ||
            dayjs(project.endDate).isBetween(range.startDate, range.endDate) ||
            (dayjs(project.startDate).isBefore(range.startDate, 'day') &&
              dayjs(project.endDate).isAfter(range.endDate, 'day'))
        ).map(project => ({
          ...project,
          startDate: new Date(project.startDate),
          endDate: new Date(project.endDate),
        })),
      })),
    [dataverseData, range.endDate, range.startDate]
  );

 const handleFilterButton=()=>{
    setFilterBtnState(filterButtonState === 0 ? 1 : 0)
 }

  const handleTileClick = (data: SchedulerProjectData) =>
    console.log(
      `Item ${data.title} was clicked. \n==============\nStart date: ${data.startDate} \n==============\nEnd date: ${data.endDate}\n==============\nOccupancy: ${data.occupancy}`
    );
    console.log(dataverseData, 'dataverseData');
    // Filter Functionality code down bellow
    interface FormData {
      StartDate: string;
      EndDate: string;
      status: string[];
      dispatch: boolean;
      pickup: boolean;
      inhouse: boolean;
      outsource: boolean;
    }


    const [dispatch, setDispatch] = useState(false)
    const [pickup, setPickup] = useState(false)
    const [inhouse, setInhouse] = useState(false)
    const [outsource, setOutsource] = useState(false)
    const [formData, setFormData] = useState<FormData>({
        StartDate: '',
        EndDate: '',
        status: [],
        dispatch: dispatch,
        pickup: pickup,
        inhouse: inhouse,
        outsource: outsource,
    })
    formData.status = selectedOptions
    const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault()
        if (e.target.value && !selectedOptions.includes(e.target.value)) {
            setSelectedOptions([...selectedOptions, e.target.value])
            setSelectedOption('')
        }
    }
    const handleRemoveOption = (option: string) => {
        setSelectedOptions(selectedOptions.filter((item) => item !== option))
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }
    const handleTypeChange = (type: 'Dispatch' | 'Pickup' | 'Inhouse' | 'Outsourced') => {
        switch (type) {
            case 'Dispatch':
                setDispatch(!dispatch)
                setFormData({ ...formData, dispatch: !dispatch })
                break
            case 'Pickup':
                setPickup(!pickup)
                setFormData({ ...formData, pickup: !pickup })
                break
            case 'Inhouse':
                setInhouse(!inhouse)
                setFormData({ ...formData, inhouse: !inhouse })
                break
            case 'Outsourced':
                setOutsource(!outsource)
                setFormData({ ...formData, outsource: !outsource })
                break
            default:
                break
        }
    }
    console.log(formData, 'formData')
    function filterSampleData(data: SchedulerRow[], conditions: FormData) {
      // Helper function to safely parse dates
      const parseDate = (dateString: Date|string ) => {
        if (!dateString) return null;
        const date = new Date(dateString);
        return isNaN(date.getTime()) ? null : date;
      };
    
      // Helper function to compare values dynamically
      // const compareValues = (value: any, minCondition: any, maxCondition: any) => {
      //   const numValue = Number(value);
      //   const numMinCondition = Number(minCondition);
      //   const numMaxCondition = Number(maxCondition);
    
      //   if (numMinCondition === numMaxCondition) return true; // Ignore if min and max are the same
    
      //   if (numMinCondition === 0 && numMaxCondition === 0) return true; // Ignore if both are zero
      //   if (numMinCondition === 0) return numValue <= numMaxCondition; // Only check max
      //   if (numMaxCondition === 0) return numValue >= numMinCondition; // Only check min
      //   return numValue >= numMinCondition && numValue <= numMaxCondition; // Check both min and max
      // };
    
      return data.map(item => ({
        ...item,
        data: item.data.filter(job => {
    
          return Object.entries(conditions).every(([key, value]) => {
            switch (key) {
              case 'StartDate': {
                const jobStartDate = parseDate(job.startDate)?.toISOString() ?? '';
                const conditionStartDate = parseDate(value as string)?.toISOString() ?? '';
                return value === undefined || value === '' || jobStartDate >= conditionStartDate;
              }
              case 'EndDate': {
                const jobEndDate = parseDate(job.endDate)?.toISOString() ?? '';
                const conditionEndDate = parseDate(value as string)?.toISOString() ?? '';
                return value === undefined || value === '' || jobEndDate <= conditionEndDate;
              }
              case 'status':{
                console.log(value, 'value');
                return value === undefined || value === '' || value.length === 0 || value.includes(job.status);
              }
              case 'dispatch':
                return (
                  value === undefined || 
                  value === '' || 
                  value === false || 
                  (value === true && job.transporttype === 'Dispatch')
                );
              case 'pickup':
                return (
                  value === undefined || 
                  value === '' || 
                  value === false || 
                  (value === true && job.transporttype === 'Pickup')
                );
              case 'inhouse':
                return (
                  value === undefined || 
                  value === '' || 
                  value === false || 
                  (value === true && job.tickettype === 'Inhouse')
                );
              case 'outsource':
                return (
                  value === undefined || 
                  value === '' || 
                  value === false || 
                  (value === true && job.tickettype === 'Outsourced')
                );
              default:
                return true; // Ignore unknown conditions
            }
          });
        })
      })).filter(item => item.data.length > 0);
    }
    const addFilters = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault()
      // console.log('addFilters');
      // filter code is here
    const finalData = filterSampleData(usedata, formData);
    setDataverseData(finalData);
    console.log(finalData, 'finalData');
    handleFilterButton();
    };
   
const resetData = () => {
    setDataverseData(usedata.map((item) => ({
      ...item,
      data: item.data.map((project) => ({
        ...project,
        startDate: new Date(project.startDate),
        endDate: new Date(project.endDate),
      })),
    })));
    setSelectedOptions([])
    setSelectedOption('')
    setDispatch(false)
    setPickup(false)
    setInhouse(false)
    setOutsource(false)
    setFormData({
      StartDate: '',
      EndDate: '',
      status: [],
      dispatch: false,
      pickup: false,
      inhouse: false,
      outsource: false,
    });
    setFilterBtnState(0)
}
  return (
    <div className=''>
      <div className="filtersSection z-50 absolute  top-1.5 text-white px-2 rounded left-52 flex gap-2">
        <button className={`flex items-center gap-1 p-1 px-3 text-sm font-semibold  rounded`} onClick={handleFilterButton}  style={{ backgroundColor: filterButtonState?"#3498db":"#00375C" }}>Filter <CiFilter/></button>
        <button className={`flex items-center gap-1 p-1 px-3 text-sm font-semibold bg-orange-500 rounded`} onClick={resetData}>Reset</button>
        {filterButtonState !== 0 &&  <div className="FilterSection border w-96 z-50 absolute bg-white top-10 rounded text-black">
            <form
                action=""
                className="text-sm flex flex-col gap-3 mx-auto p-4 w-[100%]"
            >
                <div className="flex flex-col gap-1">
                    <label htmlFor="Owner" className="font-semibold ">
                        Start Date & Time
                    </label>
                    <input
                        type="datetime-local"
                        id="StartDate"
                        name="StartDate"
                        className="border  p-2 w-full rounded-md"
                        onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="Owner" className="font-semibold ">
                        End Date & Time
                    </label>
                    <input
                        type="datetime-local"
                        id="EndDate"
                        name="EndDate"
                        className="border  p-2 w-full rounded-md"
                        onChange={handleChange}
                    />
                </div>

                <div className="statusSection flex flex-col gap-1">
                    <label htmlFor="Job Status" className="font-semibold">
                        Status
                    </label>
                    <select
                        value={selectedOption}
                        onChange={handleOptionChange}
                        className="p-2 border rounded mb-1 w-full"
                    >
                        <option value="">Select an option</option>
                        {options.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>

                    <div className="flex gap-1 p-1  rounded flex-wrap">
                        {selectedOptions.map((option) => (
                            <div
                                key={option}
                                className={`bg-gray-200 rounded p-1 text-xs flex gap-1 items-center `}
                            >
                                {option}
                                <button
                                    onClick={() => handleRemoveOption(option)}
                                    className=" text-sm text-white"
                                >
                                    x
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="tickettype" className="font-semibold mb-1">
                        Transport Type
                    </label>
                    <div className="flex gap-2">
                        <div
                            className={`border-none p-2 w-full rounded-md text-center font-semibold cursor-pointer  ${
                                !dispatch ? 'bg-gray-200' : 'bg-green-400'
                            }`}
                            onClick={() => {
                                setDispatch(!dispatch)
                                if(pickup){
                                    setPickup(!pickup)
                                }
                                handleTypeChange('Dispatch')
                            }}
                        >
                            Dispatch
                        </div>
                        <div
                            className={`border-none p-2 w-full rounded-md text-center font-semibold cursor-pointer ${
                                !pickup ? 'bg-gray-200' : 'bg-green-400'
                            }`}
                            onClick={() => {
                                setPickup(!pickup)
                                if(dispatch){
                                    setDispatch(!dispatch)
                                }
                                handleTypeChange('Pickup')
                            }}
                        >
                            Pick up
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="tickettype" className="font-semibold mb-1">
                        Ticket Type
                    </label>
                    <div className="flex gap-2">
                        <div
                            className={` p-2 w-full rounded-md text-center font-semibold cursor-pointer border-none ${
                                !inhouse ? 'bg-gray-200' : 'bg-green-400'
                            }`}
                            onClick={() => {
                                setInhouse(!inhouse)
                              if(outsource){
                                setOutsource(!outsource)
                              }
                                handleTypeChange('Inhouse')
                            }}
                        >
                            In House
                        </div>
                        <div
                            className={`border-none p-2 w-full rounded-md text-center font-semibold cursor-pointer ${
                                !outsource ? 'bg-gray-200' : 'bg-green-400'
                            }`}
                            onClick={() => {
                                setOutsource(!outsource)
                               if(inhouse){
                                setInhouse(!inhouse)
                               }
                                handleTypeChange('Outsourced')
                            }}
                        >
                            OutSource
                        </div>
                    </div>
                </div>
                <button className={` font-semibold bg-gray-200 p-3 rounded-md hover:bg-gray-400`} onClick={(e) => addFilters(e)}>
                    Search
                </button>
            </form>
        </div>}
        </div>
      {values.isFullscreen ? (
        <Scheduler
          startDate={values.startDate ? new Date(values.startDate).toISOString() : undefined}
          onRangeChange={handleRangeChange}
          data={filteredData || []}
          isLoading={isLoading}
          onTileClick={(data)=>redirectToRecord(data.id)}
            // onFilterData={handleFilterData}
          config={{ zoom: 1, maxRecordsPerPage: values.maxRecordsPerPage,defaultTheme:"light",filterButtonState:-1,showTooltip:false }}
          onItemClick={(data) => console.log(data.toString())}
        />
      ) : (
        <StyledSchedulerFrame>
          <Scheduler
            startDate={values.startDate ? new Date(values.startDate).toISOString() : undefined}
            onRangeChange={handleRangeChange}
            isLoading={false}
            data={filteredData}
            onTileClick={handleTileClick}
            // onFilterData={handleFilterData}
            onItemClick={(data) => console.log('clicked: ', data)}
          />
        </StyledSchedulerFrame>
      )}
    </div>
  );
}

export default App;
