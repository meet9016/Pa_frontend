import React, { useEffect, useState } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import api from '../utils.jsx/axiosInstance';
import endPointApi from '../utils.jsx/endPointApi';


const Inquiry = () => {
    const [inquiryData, setInquiryData] = useState([]);
    const [loading, setLoading] = useState(false);
    console.log(inquiryData, 'inquiry');

    const getProduct = async () => {
        try {
            setLoading(true)
            const res = await api.post(endPointApi.inquiryList, {})
            if (res.data && res.data.data) {
                setInquiryData(res.data.data)
            }
        } catch (err) {
            console.log("Error Fetch Data", err)
        } finally {
            setLoading(false)
        }
    }

    const actionBodyTemplate = (inquiryData) => {
        return (
            <button
                onClick={() => {
                    if (inquiryData.link) {
                        window.open(inquiryData.link, "_blank");
                    } else {
                        console.log("No link available");
                    }
                }}
                className="flex items-center gap-2 px-3 py-1 
                       bg-[#251c4b]
                       hover: cursor-pointer
                       text-white text-sm font-medium 
                       rounded-lg shadow-md transition duration-300"
            >
                {/* <i className="pi pi-eye"></i> */}
                <span>View Product</span>
            </button>
        );
    };



    useEffect(() => {
        getProduct()
    }, [])
    return (
        <div className="w-full px-4 bg-[#EAEBEF] flex mt-[80px] justify-center">
            <div className="w-full max-w-[1300px] mt-8 pb-5 overflow-x-auto">
                <DataTable
                    value={inquiryData}
                    // tableStyle={{ minWidth: '20rem' }}
                    emptyMessage="No product found"
                    responsiveLayout="stack"
                    breakpoint="960px"
                >
                    <Column sortable field='order_number' header="Inquiry Number"></Column>
                    <Column
                        sortable
                        field="order_date"
                        header="Inquiry Date"
                        body={(rowData) => {
                            // ensure it's parsed as Date
                            const date = new Date(rowData.order_date);
                            return date.toLocaleDateString("en-GB"); // dd/mm/yyyy format
                        }}
                    >
                    </Column>

                    {/* <Column sortable field='product_count' header="Product Count"></Column> */}
                    <Column body={actionBodyTemplate} header="Action"></Column>
                </DataTable>
            </div>
        </div>
    )
}

export default Inquiry
