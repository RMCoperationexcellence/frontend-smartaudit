import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { subDays, format } from 'date-fns';
import { convertToThaiTime } from '../util/convertTime'; // Assuming convertToThaiTime function is defined in convertTime.js


const getDatesArray = (daysCount) => {
    const dates = [];
    const currentDate = new Date();
    for (let i = daysCount - 1; i >= 0; i--) {
        dates.push(format(subDays(currentDate, i), 'dd-MM-yy'));
    }
    return dates;
};

const mergeAuditData = (auditData, auditGroupData, dates) => {
    const mergedData = {};
    console.log(mergedData);
    // Initialize mergedData with all audit groups
    auditGroupData.forEach((group) => {
        mergedData[group.NAME] = {
            NAME: group.NAME,
            CREATE_DATE: null,
            VERIFY_STATUS: '',
            dates: dates.reduce((acc, date) => {
                acc[date] = { CREATE_DATE: '', VERIFY_STATUS: '' };
                return acc;
            }, {}),
        };
    });

    // Populate mergedData with auditData
    auditData.forEach((item) => {
        const { NAME, CREATE_DATE, VERIFY_STATUS, AUDIT_GROUP_ID } = item;

        // Convert to Thai time and format the date
        const thaiTimeUpdateDate = convertToThaiTime(CREATE_DATE);
        const formattedDate = format(new Date(thaiTimeUpdateDate), 'dd-MM-yy');

        // Check if VERIFY_STATUS exists and update mergedData accordingly
        if (VERIFY_STATUS) {
            // Initialize mergedData entry if it doesn't exist
            if (!mergedData[NAME]) {
                mergedData[NAME] = {
                    CREATE_DATE: null, // Initialize CREATE_DATE
                    VERIFY_STATUS: null, // Initialize VERIFY_STATUS
                    dates: {} // Initialize dates object
                };
            }

            // Update VERIFY_STATUS in mergedData
            mergedData[NAME].CREATE_DATE = thaiTimeUpdateDate;
            mergedData[NAME].VERIFY_STATUS = VERIFY_STATUS;

            // Update dates-specific entry
            mergedData[NAME].dates[formattedDate] = {
                CREATE_DATE: thaiTimeUpdateDate,
                VERIFY_STATUS: VERIFY_STATUS,
            };

            // Optionally, associate AUDIT_GROUP_ID with mergedData[NAME]
            if (AUDIT_GROUP_ID) {
                mergedData[NAME].AUDIT_GROUP_ID = AUDIT_GROUP_ID;
            }
        }
    });


    // Convert dates object to array and attach to each NAME
    Object.values(mergedData).forEach((item) => {
        item.datesArray = dates.map(date => item.dates[date] || {
            CREATE_DATE: '',
            VERIFY_STATUS: '',
        });
    });

    return Object.values(mergedData);
};

const AuditDataTable = ({ auditData, auditGroupData }) => {
    const [mergedData, setMergedData] = useState([]);

    useEffect(() => {
        if (auditGroupData && auditGroupData.length > 0) {
            const dates = getDatesArray(7);
            const updatedMergedData = mergeAuditData(auditData, auditGroupData, dates);
            setMergedData(updatedMergedData);
        }
    }, [auditData, auditGroupData]);

    if (!auditGroupData || auditGroupData.length === 0) {
        return <p>No data available.</p>;
    }

    const dates = getDatesArray(7);
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: '650px' }}>
                <TableHead>
                    <TableRow style={{
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        margin: '8px 0',
                        backgroundColor: '#f7f7f7', // สีพื้นหลังหลักของตารางเข้มขึ้นเล็กน้อย
                        transition: 'transform 0.2s', // เพิ่มการเคลื่อนไหวเล็กน้อยเมื่อผู้ใช้เลื่อนเมาส์
                        cursor: 'pointer', // เปลี่ยนเคอร์เซอร์เป็น pointer เพื่อบอกว่าแถวนี้สามารถคลิกได้
                        ':hover': {
                            transform: 'scale(1.02)', // ขยายขนาดเล็กน้อยเมื่อผู้ใช้เลื่อนเมาส์
                            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)' // เพิ่มเงาเมื่อผู้ใช้เลื่อนเมาส์
                        }
                    }}>
                        <TableCell style={{
                            minWidth: '160px',
                            position: 'sticky',
                            left: 0,
                            backgroundColor: '#ffffff', // สีพื้นหลังของเซลล์เป็นสีขาว
                            zIndex: 1,
                            textAlign: 'center',
                            fontSize: '20px',
                            padding: '9px', // เพิ่ม padding
                            fontWeight: 'bold', // ทำให้ข้อความหนาขึ้น
                            color: '#333', // เปลี่ยนสีข้อความให้เข้มขึ้น
                            border: '1px solid #ddd', // เพิ่มเส้นขอบให้เซลล์
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' // เพิ่มเงาให้เซลล์
                        }}>
                            หัวข้อ
                        </TableCell>
                        <TableCell style={{
                            minWidth: '110px',
                            position: 'sticky',
                            left: '160px',
                            backgroundColor: '#ffffff', // สีพื้นหลังของเซลล์เป็นสีขาว
                            zIndex: 1,
                            textAlign: 'center',
                            fontSize: '20px',
                            padding: '9px', // เพิ่ม padding
                            fontWeight: 'bold', // ทำให้ข้อความหนาขึ้น
                            color: '#333', // เปลี่ยนสีข้อความให้เข้มขึ้น
                            border: '1px solid #ddd', // เพิ่มเส้นขอบให้เซลล์
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' // เพิ่มเงาให้เซลล์
                        }}>
                            สรุป
                        </TableCell>
                        {dates.slice().reverse().map((date, index) => (
                            <TableCell key={index} style={{
                                minWidth: '100px',
                                left: index === 0 ? 0 : 'auto',
                                zIndex: index === 0 ? 1 : 'auto',
                                textAlign: 'center',
                                backgroundColor: '#ffffff', // สีพื้นหลังของเซลล์เป็นสีขาว
                                padding: '9px', // เพิ่ม padding
                                color: '#666', // เปลี่ยนสีข้อความให้อ่อนลงเล็กน้อย
                                border: '1px solid #ddd', // เพิ่มเส้นขอบให้เซลล์
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' // เพิ่มเงาให้เซลล์
                            }}>
                                {date}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {mergedData.map((row, rowIndex) => (
                        <TableRow key={rowIndex} style={{ 
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
                            borderRadius: '8px', 
                            overflow: 'hidden', 
                            margin: '8px 0', 
                            backgroundColor: '#f7f7f7', // สีพื้นหลังหลักของตารางเข้มขึ้นเล็กน้อย
                            transition: 'transform 0.2s', // เพิ่มการเคลื่อนไหวเล็กน้อยเมื่อผู้ใช้เลื่อนเมาส์
                            cursor: 'pointer', // เปลี่ยนเคอร์เซอร์เป็น pointer เพื่อบอกว่าแถวนี้สามารถคลิกได้
                            ':hover': {
                                transform: 'scale(1.02)', // ขยายขนาดเล็กน้อยเมื่อผู้ใช้เลื่อนเมาส์
                                boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)' // เพิ่มเงาเมื่อผู้ใช้เลื่อนเมาส์
                            }
                        }}>
                            <TableCell style={{ 
                                minWidth: '160px', 
                                position: 'sticky', 
                                left: 0, 
                                backgroundColor: '#ffffff', // สีพื้นหลังของเซลล์เป็นสีขาว
                                zIndex: 1, 
                                textAlign: 'center',
                                padding: '10px', // เพิ่ม padding
                                fontSize: '16px',
                                fontWeight: 'bold', // ทำให้ข้อความหนาขึ้น
                                color: '#333', // เปลี่ยนสีข้อความให้เข้มขึ้น
                                border: '1px solid #ddd', // เพิ่มเส้นขอบให้เซลล์
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' // เพิ่มเงาให้เซลล์
                            }}>
                                {row.NAME}
                            </TableCell>
                            <TableCell style={{ 
                                minWidth: '110px',
                                height: '90px',
                                position: 'sticky', 
                                left: '160px', 
                                backgroundColor: row.VERIFY_STATUS ? (row.VERIFY_STATUS === 'ผ่าน Verify' ? 'green' : row.VERIFY_STATUS === 'ไม่ผ่าน Verify' ? 'red' : 'gray') : 'gray', 
                                zIndex: 1, 
                                textAlign: 'center',
                                padding: '10px', // เพิ่ม padding
                                color: 'white', // สีข้อความเป็นสีขาว
                                border: '1px solid #ddd', // เพิ่มเส้นขอบให้เซลล์
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' // เพิ่มเงาให้เซลล์
                            }}>
                                {row.VERIFY_STATUS ? (
                                    <>
                                        <strong>{row.VERIFY_STATUS}</strong><br />
                                        {row.CREATE_DATE ? row.CREATE_DATE : ''}
                                    </>
                                ) : (
                                    <span style={{ color: 'black' }}>ไม่มีข้อมูลการ verify</span>
                                )}
                            </TableCell>
                            {row.datesArray.slice().reverse().map((dateData, colIndex) => (
                                <TableCell key={`${rowIndex}-${colIndex}`} style={{ 
                                    minWidth: '100px', 
                                    left: colIndex === 0 ? 0 : 'auto', 
                                    zIndex: colIndex === 0 ? 1 : 'auto', 
                                    textAlign: 'center',
                                    backgroundColor: dateData.VERIFY_STATUS === 'ผ่าน Verify' ? 'green' : dateData.VERIFY_STATUS === 'ไม่ผ่าน Verify' ? 'red' : 'transparent',
                                    padding: '10px', // เพิ่ม padding
                                    color: 'white', // เปลี่ยนสีข้อความให้อ่อนลงเล็กน้อย
                                    border: '1px solid #ddd', // เพิ่มเส้นขอบให้เซลล์
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' // เพิ่มเงาให้เซลล์
                                }}>
                                    {dateData && (
                                        <>
                                            <div>{dateData.VERIFY_STATUS}</div>
                                        </>
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                        
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default AuditDataTable;
