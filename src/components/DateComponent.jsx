import React from "react";
import moment from 'moment';

const formatDate = (rowData, column) => {
    return (
        <>
            {
                rowData[column.field] &&
                <div>
                    {moment(rowData[column.field]).format('DD/MM/YYYY HH:mm:ss')}
                </div>
            }
        </>
    )
}

export default {
    formatDate
}