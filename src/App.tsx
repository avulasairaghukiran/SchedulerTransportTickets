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
const SampleData=[
  {
      "id": "6b16a7f7-1bec-4ebd-867a-fb75b3080de6",
      "label": {
          "title": "Prexa Trial",
          "icon": "",
          "subtitle": ""
      },
      "data": [
          {
              "id": "3cad9ea1-a775-ef11-ac20-000d3a09c8c5",
              "startDate": "2024-09-18T02:30:00.000Z",
              "endDate": "2024-09-19T02:30:00.000Z",
              "occupancy": 4000,
              "title": "DP - 1022",
              "bgColor": "rgb(21, 180, 191)",
              "status": "New",
              "tickettype": "Inhouse",
              "salesorder": "SO-1012",
              "salesorderid": "c2aec69e-77a5-ed11-aad0-000d3af45e7f",
              "deliverydateto": "2024-09-19T04:30:00Z",
              "rentalorder": "RES - 1086",
              "rentalorderid": "8d5f1dfb-a159-ef11-bfe3-000d3a0a0162",
              "transporttype": "Dispatch"
          },
          {
              "id": "1f183eab-9f59-ef11-bfe3-000d3a0a0162",
              "startDate": "2024-08-15T02:30:00.000Z",
              "endDate": "2024-08-15T04:30:00.000Z",
              "occupancy": 4000,
              "title": "DP - 1021",
              "bgColor": "rgb(21, 180, 191)",
              "status": "New",
              "tickettype": "Outsourced",
              "rentalorder": "RC - 1085",
              "rentalorderid": "4a450c5d-9f59-ef11-bfe3-000d3a0a0162",
              "transporttype": "Dispatch"
          },
          {
              "id": "a4b74bcb-f706-ef11-9f89-002248d56be9",
              "startDate": null,
              "endDate": null,
              "occupancy": 4000,
              "title": "PU - 1016",
              "bgColor": "rgb(21, 180, 191)",
              "status": "New",
              "rentalorder": "RC - 1053",
              "rentalorderid": "6c3d9472-f706-ef11-9f89-002248d56be9",
              "transporttype": "Pickup"
          },
          {
              "id": "03dde9e6-3406-ef11-9f8a-000d3a0a2484",
              "startDate": "2024-04-29T02:30:00.000Z",
              "endDate": "2024-04-29T04:30:00.000Z",
              "occupancy": 4000,
              "title": "DP - 1015",
              "bgColor": "rgb(21, 180, 191)",
              "status": "New",
              "tickettype": "Outsourced",
              "rentalorder": "RC - 1050",
              "rentalorderid": "b08cef36-3406-ef11-9f8a-000d3a0a2484",
              "transporttype": "Dispatch"
          },
          {
              "id": "0beaf0d0-3406-ef11-9f8a-000d3a0a2484",
              "startDate": "2024-04-29T02:30:00.000Z",
              "endDate": "2024-04-29T04:30:00.000Z",
              "occupancy": 4000,
              "title": "DP - 1014",
              "bgColor": "rgb(21, 180, 191)",
              "status": "New",
              "tickettype": "Inhouse",
              "rentalorder": "RC - 1050",
              "rentalorderid": "b08cef36-3406-ef11-9f8a-000d3a0a2484",
              "transporttype": "Dispatch"
          },
          {
              "id": "603c9fda-2f06-ef11-9f89-6045bdcd6a83",
              "startDate": "2024-04-30T02:30:00.000Z",
              "endDate": "2024-04-30T02:30:00.000Z",
              "occupancy": 4000,
              "title": "DP - 1013",
              "bgColor": "rgb(21, 180, 191)",
              "status": "New",
              "tickettype": "Inhouse",
              "deliverydateto": "2024-04-30T04:30:00Z",
              "rentalorder": "RC - 1049",
              "rentalorderid": "24582765-2f06-ef11-9f89-6045bdcd6a83",
              "transporttype": "Dispatch"
          },
          {
              "id": "61cdfd9d-0204-ef11-9f8a-000d3a0a2484",
              "startDate": "2024-04-27T02:30:00.000Z",
              "endDate": "2024-04-27T04:30:00.000Z",
              "occupancy": 4000,
              "title": "DP - 1008",
              "bgColor": "rgb(21, 180, 191)",
              "status": "New",
              "tickettype": "Inhouse",
              "rentalorder": "RC - 1042",
              "rentalorderid": "0f724e64-0204-ef11-9f8a-000d3a0a2484",
              "transporttype": "Dispatch"
          },
          {
              "id": "fb407d88-b903-ef11-9f89-6045bdcd6a83",
              "startDate": null,
              "endDate": null,
              "occupancy": 4000,
              "title": "PU - 1007",
              "bgColor": "rgb(21, 180, 191)",
              "status": "New",
              "rentalorder": "RC - 1041",
              "rentalorderid": "b5697c54-b903-ef11-9f89-6045bdcd6a83",
              "transporttype": "Pickup"
          },
          {
              "id": "80c8c1c4-b803-ef11-9f89-6045bdcd6a83",
              "startDate": null,
              "endDate": null,
              "occupancy": 4000,
              "title": "PU - 1006",
              "bgColor": "rgb(21, 180, 191)",
              "status": "New",
              "rentalorder": "RC - 1040",
              "rentalorderid": "74d16578-b803-ef11-9f89-6045bdcd6a83",
              "transporttype": "Pickup"
          },
          {
              "id": "d067ae0b-b803-ef11-9f89-6045bdcd6a83",
              "startDate": null,
              "endDate": null,
              "occupancy": 4000,
              "title": "PU - 1005",
              "bgColor": "rgb(21, 180, 191)",
              "status": "New",
              "rentalorder": "RC - 1038",
              "rentalorderid": "6c850f84-b703-ef11-9f89-6045bdcd6a83",
              "transporttype": "Pickup"
          },
          {
              "id": "e01aff4e-2802-ef11-9f8a-000d3a0a2484",
              "startDate": null,
              "endDate": null,
              "occupancy": 4000,
              "title": "PU - 1003",
              "bgColor": "rgb(21, 180, 191)",
              "status": "New",
              "tickettype": "Outsourced",
              "rentalorder": "RES - 1035",
              "rentalorderid": "03a5592e-2802-ef11-9f8a-000d3a0a2484",
              "transporttype": "Pickup"
          },
          {
              "id": "f945aadd-6401-ef11-9f8a-000d3a0a2484",
              "startDate": "2024-04-26T02:30:00.000Z",
              "endDate": "2024-04-26T04:30:00.000Z",
              "occupancy": 4000,
              "title": "DP - 1002",
              "bgColor": "rgb(21, 180, 191)",
              "status": "New",
              "tickettype": "Outsourced",
              "rentalorder": "RES - 1029",
              "rentalorderid": "d45d88be-6401-ef11-9f8a-000d3a0a2484",
              "transporttype": "Dispatch"
          },
          {
              "id": "f84b8b74-4f01-ef11-9f8a-000d3a0a2484",
              "startDate": "2024-04-24T02:30:00.000Z",
              "endDate": "2024-04-24T04:30:00.000Z",
              "occupancy": 4000,
              "title": "DP - 1001",
              "bgColor": "rgb(21, 180, 191)",
              "status": "New",
              "tickettype": "Outsourced",
              "rentalorder": "RES - 1027",
              "rentalorderid": "5a65beba-4d01-ef11-9f8a-000d3a0a2484",
              "transporttype": "Dispatch"
          },
          {
              "id": "0d406648-78fe-ee11-9f89-6045bdcd6a83",
              "startDate": "2024-04-19T02:30:00.000Z",
              "endDate": "2024-04-20T02:30:00.000Z",
              "occupancy": 4000,
              "title": "DP - 1000",
              "bgColor": "rgb(21, 180, 191)",
              "status": "New",
              "tickettype": "Outsourced",
              "deliverydateto": "2024-04-20T04:30:00Z",
              "rentalorder": "RES - 1019",
              "rentalorderid": "2328997b-6efe-ee11-9f89-6045bdcd6a83",
              "transporttype": "Dispatch"
          }
      ]
  },
  {
      "id": "75289f5d-0173-46ed-8e7d-3e130393f8f3",
      "label": {
          "title": "Prexa User3",
          "icon": "",
          "subtitle": ""
      },
      "data": [
          {
              "id": "64eed787-f82f-ef11-8e50-002248d51571",
              "startDate": "2024-06-22T02:30:00.000Z",
              "endDate": "2024-06-28T02:30:00.000Z",
              "occupancy": 4000,
              "title": "DP - 1020",
              "bgColor": "rgb(220, 53, 53)",
              "status": "Complete",
              "tickettype": "Inhouse",
              "deliverydateto": "2024-06-28T04:30:00Z",
              "rentalorder": "RC - 1062",
              "rentalorderid": "bd801edc-3b2f-ef11-8e4f-6045bdcd2d41",
              "transporttype": "Dispatch"
          },
          {
              "id": "17614e60-f72f-ef11-8e4f-6045bdcd2d41",
              "startDate": "2024-06-22T02:30:00.000Z",
              "endDate": "2024-06-23T02:30:00.000Z",
              "occupancy": 4000,
              "title": "DP - 1019",
              "bgColor": "rgb(220, 53, 53)",
              "status": "Complete",
              "tickettype": "Inhouse",
              "deliverydateto": "2024-06-23T04:30:00Z",
              "rentalorder": "RC - 1063",
              "rentalorderid": "93d73f33-f62f-ef11-8e4f-6045bdcd2d41",
              "transporttype": "Dispatch"
          }
      ]
  },
  {
      "id": "fab6c04e-e9d0-4b8e-8151-985fe01fc1f5",
      "label": {
          "title": "Prexa User 2",
          "icon": "",
          "subtitle": ""
      },
      "data": [
          {
              "id": "9f4bc0a1-c612-ef11-9f8a-000d3a0a2484",
              "startDate": null,
              "endDate": null,
              "occupancy": 4000,
              "title": "PU - 1018",
              "bgColor": "rgb(21, 180, 191)",
              "status": "New",
              "tickettype": "Inhouse",
              "rentalorder": "RC - 1058",
              "rentalorderid": "074002e8-c412-ef11-9f89-6045bdcd0cbc",
              "transporttype": "Pickup"
          },
          {
              "id": "c5e8fa6e-2212-ef11-9f89-6045bdcd0cbc",
              "startDate": null,
              "endDate": null,
              "occupancy": 4000,
              "title": "PU - 1017",
              "bgColor": "rgb(220, 53, 53)",
              "status": "Complete",
              "tickettype": "Inhouse",
              "rentalorder": "RC - 1057",
              "rentalorderid": "bad93e1a-2212-ef11-9f89-6045bdcd0cbc",
              "transporttype": "Pickup"
          },
          {
              "id": "d3dcd77f-1504-ef11-9f89-6045bdcd6a83",
              "startDate": null,
              "endDate": null,
              "occupancy": 4000,
              "title": "PU - 1011",
              "bgColor": "rgb(21, 180, 191)",
              "status": "New",
              "rentalorder": "RC - 1043",
              "rentalorderid": "e467208b-0e04-ef11-9f89-6045bdcd6a83",
              "transporttype": "Pickup"
          },
          {
              "id": "cd0b6329-1404-ef11-9f89-6045bdcd6a83",
              "startDate": "2024-04-27T12:00:00.000Z",
              "endDate": "2024-04-27T12:00:00.000Z",
              "occupancy": 4000,
              "title": "DP - 1010",
              "bgColor": "rgb(21, 180, 191)",
              "status": "New",
              "tickettype": "Outsourced",
              "deliverydateto": "2024-04-27T14:00:00Z",
              "rentalorder": "RC - 1043",
              "rentalorderid": "e467208b-0e04-ef11-9f89-6045bdcd6a83",
              "transporttype": "Dispatch"
          },
          {
              "id": "f20ba0ef-1304-ef11-9f89-6045bdcd6a83",
              "startDate": "2024-04-27T12:00:00.000Z",
              "endDate": "2024-04-27T12:00:00.000Z",
              "occupancy": 4000,
              "title": "DP - 1009",
              "bgColor": "rgb(21, 180, 191)",
              "status": "New",
              "tickettype": "Inhouse",
              "deliverydateto": "2024-04-27T14:00:00Z",
              "rentalorder": "RC - 1043",
              "rentalorderid": "e467208b-0e04-ef11-9f89-6045bdcd6a83",
              "transporttype": "Dispatch"
          },
          {
              "id": "6362fbaf-4b02-ef11-9f8a-000d3a0a2484",
              "startDate": "2024-04-25T12:00:00.000Z",
              "endDate": "2024-04-25T14:00:00.000Z",
              "occupancy": 4000,
              "title": "DP - 1004",
              "bgColor": "rgb(21, 180, 191)",
              "status": "New",
              "tickettype": "Inhouse",
              "rentalorder": "RC - 1036",
              "rentalorderid": "15e1702b-4802-ef11-9f8a-000d3a0a2484",
              "transporttype": "Dispatch"
          }
      ]
  },
  {
      "id": "b6da2d90-e7d4-4199-9c7a-3a43880ad899",
      "label": {
          "title": "Prexa User 1",
          "icon": "",
          "subtitle": ""
      },
      "data": [
          {
              "id": "4f1d0db3-a204-ef11-9f8a-000d3a0a2484",
              "startDate": "2024-05-04T02:30:00.000Z",
              "endDate": "2024-05-04T04:30:00.000Z",
              "occupancy": 4000,
              "title": "DP - 1012",
              "bgColor": "rgb(21, 180, 191)",
              "status": "New",
              "tickettype": "Inhouse",
              "rentalorder": "RC - 1048",
              "rentalorderid": "5ed8b738-a204-ef11-9f8a-000d3a0a2484",
              "transporttype": "Dispatch"
          }
      ]
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
      // const results = await dataRetrive();
      // const transformedData = transformData(results.entities);
      // console.log(transformedData, 'transformedData');
      // --------------------------------
      // Define or import your sample data here
      setDataverseData(SampleData);
      setUseData(SampleData);
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
    const handleTypeChange = (type: 'dispatch' | 'pickup' | 'inhouse' | 'outsource') => {
        switch (type) {
            case 'dispatch':
                setDispatch(!dispatch)
                setFormData({ ...formData, dispatch: !dispatch })
                break
            case 'pickup':
                setPickup(!pickup)
                setFormData({ ...formData, pickup: !pickup })
                break
            case 'inhouse':
                setInhouse(!inhouse)
                setFormData({ ...formData, inhouse: !inhouse })
                break
            case 'outsource':
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
          // console.log(Object.entries(conditions))
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
                return value === undefined || value === '' || value === false || (value === true && job.transporttype === 'dispatch');
              case 'pickup':
                return value === undefined || value === '' || value === false || (value === true && job.transporttype === 'pickup');
              case 'inhouse':
                return value === undefined || value === '' || value === false || (value === true && job.tickettype === 'inhouse');
              case 'outsource':
                return value === undefined || value === '' || value === false || (value === true && job.tickettype === 'outsource');
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
                                handleTypeChange('dispatch')
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
                                handleTypeChange('pickup')
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
                                handleTypeChange('inhouse')
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
                                handleTypeChange('outsource')
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
