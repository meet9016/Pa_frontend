// import React, { useEffect, useState } from 'react'
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import api from '../utils.jsx/axiosInstance';
// import endPointApi from '../utils.jsx/endPointApi';


// const Inquiry = () => {
//     const [inquiryData, setInquiryData] = useState([]);
//     const [loading, setLoading] = useState(false);
//     console.log(inquiryData, 'inquiry');

//     const getProduct = async () => {
//         try {
//             setLoading(true)
//             const res = await api.post(endPointApi.inquiryList, {})
//             if (res.data && res.data.data) {
//                 setInquiryData(res.data.data)
//             }
//         } catch (err) {
//             console.log("Error Fetch Data", err)
//         } finally {
//             setLoading(false)
//         }
//     }

//     const actionBodyTemplate = (inquiryData) => {
//         return (
//             <button
//                 onClick={() => {
//                     if (inquiryData.link) {
//                         window.open(inquiryData.link, "_blank");
//                     } else {
//                         console.log("No link available");
//                     }
//                 }}
//                 className="flex items-center gap-2 px-3 py-1 
//                        bg-[#251c4b]
//                        hover: cursor-pointer
//                        text-white text-sm font-medium 
//                        rounded-lg shadow-md transition duration-300"
//             >
//                 {/* <i className="pi pi-eye"></i> */}
//                 <span>View Product</span>
//             </button>
//         );
//     };



//     useEffect(() => {
//         getProduct()
//     }, [])
//     return (
//         // <div className="w-full px-4 bg-[#EAEBEF] flex mt-[80px] justify-center">
//         //     <div className="w-full max-w-[1300px] mt-8 pb-5 overflow-x-auto">
//         //         <DataTable
//         //             value={inquiryData}
//         //             tableStyle={{ minWidth: '20rem' }}
//         //             emptyMessage="No product found"
//         //             responsiveLayout="stack"
//         //         >
//         //             <Column sortable field='order_number' header="Inquiry Number"></Column>
//         //             <Column
//         //                 sortable
//         //                 field="order_date"
//         //                 header="Inquiry Date"
//         //                 body={(rowData) => {
//         //                     // ensure it's parsed as Date
//         //                     const date = new Date(rowData.order_date);
//         //                     return date.toLocaleDateString("en-GB"); // dd/mm/yyyy format
//         //                 }}
//         //             >
//         //             </Column>

//         //             {/* <Column sortable field='product_count' header="Product Count"></Column> */}
//         //             <Column body={actionBodyTemplate} header="Action"></Column>
//         //         </DataTable>
//         //     </div>
//         // </div>




//         <div className="w-full px-4 bg-[#EAEBEF] flex mt-[80px] justify-center">
//             <div className="w-full max-w-[1300px] mt-8 pb-5">
//                 <DataTable
//                     value={inquiryData}
//                     emptyMessage="No product found"
//                     responsiveLayout="stack"   // mobile par stack view
//                     breakpoint="960px"         // 960px se neeche stack hoga
//                     className="w-full"         // table ko 100% width pe force karo
//                 >
//                     <Column field="order_number" header="Inquiry Number" sortable />
//                     <Column
//                         field="order_date"
//                         header="Inquiry Date"
//                         sortable
//                         body={(rowData) => {
//                             const date = new Date(rowData.order_date);
//                             return date.toLocaleDateString("en-GB"); // dd/mm/yyyy
//                         }}
//                     />
//                     <Column body={actionBodyTemplate} header="Action" />
//                 </DataTable>
//             </div>
//         </div>


//     )
// }

// export default Inquiry




















// Inquiry.jsx
import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import api from '../utils.jsx/axiosInstance';
import endPointApi from '../utils.jsx/endPointApi';

const MOBILE_BREAKPOINT = 520; // <= this width we'll render mobile cards (no scrollbar)

const Inquiry = () => {
    const [inquiryData, setInquiryData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth <= MOBILE_BREAKPOINT : false);

    useEffect(() => {
        const onResize = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
        onResize();
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    const getProduct = async () => {
        try {
            setLoading(true);
            const res = await api.post(endPointApi.inquiryList, {});
            if (res.data && res.data.data) {
                setInquiryData(res.data.data);
            } else {
                setInquiryData([]);
            }
        } catch (err) {
            console.log('Error Fetch Data', err);
            setInquiryData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProduct();
    }, []);

    const actionBodyTemplate = (row) => {
        return (
            <button
                onClick={() => {
                    if (row.link) {
                        window.open(row.link, '_blank');
                    } else {
                        console.log('No link available');
                    }
                }}
                className="flex items-center gap-2 px-3 py-1 bg-[#251c4b] cursor-pointer text-white text-sm font-medium rounded-lg shadow-md transition duration-300"
            >
                <span>View Product</span>
            </button>
        );
    };

    // Safe formatter for date
    const formatDate = (d) => {
        if (!d) return '-';
        try {
            return new Date(d).toLocaleDateString('en-GB');
        } catch {
            return '-';
        }
    };

    return (
        // outer wrapper: ensure no accidental horizontal overflow
        <div className="w-full px-4 bg-[#EAEBEF] flex mt-[80px] justify-center overflow-x-hidden">
            <div className="w-full max-w-[1300px] mt-8 pb-5">
                {/* MOBILE: card/list layout to avoid horizontal scroll */}
                {isMobile ? (
                    <div className="flex flex-col gap-4">
                        {loading ? (
                            <div className="text-center py-6">Loading...</div>
                        ) : inquiryData.length === 0 ? (
                            <div className="text-center py-6">No product found</div>
                        ) : (
                            inquiryData.map((row, idx) => (
                                <div
                                    key={row.order_number ?? idx}
                                    className="bg-white rounded-lg p-4 shadow-sm break-words"
                                >
                                    <div className="mb-2">
                                        <div className="text-xs text-gray-500">Inquiry Number</div>
                                        <div className="text-sm font-medium">{row.order_number ?? '-'}</div>
                                    </div>

                                    <div className="mb-2">
                                        <div className="text-xs text-gray-500">Inquiry Date</div>
                                        <div className="text-sm">{formatDate(row.order_date)}</div>
                                    </div>

                                    <div className="mt-3">
                                        {actionBodyTemplate(row)}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                ) : (
                    // DESKTOP / TABLET: DataTable
                    <DataTable
                        value={inquiryData}
                        loading={loading}
                        emptyMessage="No product found"
                        className="w-full"
                    // remove tableStyle/minWidth to avoid forcing horizontal scroll
                    >
                        <Column field="order_number" header="Inquiry Number" sortable body={(r) => <div className="break-words">{r.order_number ?? '-'}</div>} />
                        <Column
                            field="order_date"
                            header="Inquiry Date"
                            sortable
                            body={(rowData) => <div className="whitespace-normal">{formatDate(rowData.order_date)}</div>}
                        />
                        <Column header="Action" body={actionBodyTemplate} style={{ minWidth: '120px' }} />
                    </DataTable>
                )}
            </div>
        </div>
    );
};

export default Inquiry;
