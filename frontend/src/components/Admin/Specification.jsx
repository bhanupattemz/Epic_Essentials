
import React, { Fragment, useEffect } from "react"

import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

import { MdDeleteOutline } from "react-icons/md";


export default function Specifications({ items, delHandler }) {
    const columns = [
        { field: "id", headerName: "Type", hide: true, flex: 1 },
        { field: "value", headerName: "Value", flex: 1 },
        {
            field: "action",
            headerName: "action",
            flex: 0.5,
            renderCell: (params) => (
                <p onClick={()=>delHandler(params.value)}><MdDeleteOutline /></p>
            )
        }
    ];
    let rows = items ? items.map((item) => ({
        id: item.key,
        value: item.value,
        action: item.key,
    })) : [];

    return (
        <Fragment>

            <section className="">
                <Box sx={{ height: 480, width: '100%' }}>
                    <DataGrid
                        columns={columns}
                        rows={rows}
                        rowHeight={38}
                        disableRowSelectionOnClick
                    />
                </Box>
            </section>

        </Fragment>
    )
}