import React from 'react';
import {
    Grid,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
} from "@mui/material";

function SummaryPlanTable({ dataResults, summaryPlantData }) {
    const text1 = 'ไม่ผ่าน(<=79%)';
    const text2 = 'ผ่าน(>=80%)ไม่มีจุดแดง';

    const groupByPlantNo = (data) => {
        return data.reduce((acc, item) => {
          if (!acc[item.PLANT_NO]) {
            acc[item.PLANT_NO] = [];
          }
          acc[item.PLANT_NO].push(item);
          return acc;
        }, {});
    };
    
    const calculateOverallPercentage = (data) => {
        const totalActualScore = data.reduce(
          (acc, item) => acc + item.ActualScore,
          0
        );
        const totalMaxScore = data.reduce((acc, item) => acc + item.TotalScore, 0);
        const totalMustPass = data.reduce(
          (acc, item) => acc + item.MustPassCount,
          0
        );
        const overallPercentage = (
          (totalActualScore / totalMaxScore) *
          100
        ).toFixed(0);
        return {
          percentage: overallPercentage,
          status: overallPercentage >= 80 ? "ผ่าน" : "ไม่ผ่าน",
          CountMustpass: totalMustPass,
        };
    };

    const groupedData = groupByPlantNo(dataResults);

    const calculateStatistics = () => {
        let passedCount = 0;
        let notPassedCount = 0;
    
        for (const key in groupedData) {
            const { percentage } = calculateOverallPercentage(groupedData[key]);
            if (percentage >= 80) {
                passedCount++;
            } else {
                notPassedCount++;
            }
        }
    
        return { passedCount, notPassedCount };
    };

    const { passedCount, notPassedCount } = calculateStatistics();

    const countAuditedFactories = (data) => {
        let auditedCount = 0;
        
        for (const key in data) {
            const factoryData = data[key];
            // Check if any item in factoryData has ActualScore > 0
            if (factoryData.some(item => item.ActualScore > 0)) {
                auditedCount++;
            }
        }
        
        return auditedCount;
    };

    const auditedFactoriesCount = countAuditedFactories(groupedData);
    const totalFactories = Object.keys(groupedData).length;

    return (
        <div>
            <Grid item xs={12}>
                <TableContainer>
                    <Table>
                        <TableHead style={{ backgroundColor: "white" }}>
                            <TableRow>
                                <TableCell sx={{ borderBottom: '1px solid black' }}></TableCell>
                                <TableCell sx={{ borderColor: 'black', borderWidth: '1px', borderStyle: 'solid' }}>หน่วย</TableCell>
                                <TableCell sx={{ borderColor: 'black', borderWidth: '1px', borderStyle: 'solid' }}>Verify</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            <TableRow>
                                <TableCell sx={{ borderColor: 'black', borderWidth: '1px', borderStyle: 'solid' }}>จำนวนโรงงานที่ Audit แล้ว จำนวนโรงงานทั้งหมด {totalFactories} รง.</TableCell>
                                <TableCell sx={{ borderColor: 'black', borderWidth: '1px', borderStyle: 'solid' }}>โรงงาน</TableCell>
                                <TableCell sx={{ borderColor: 'black', borderWidth: '1px', borderStyle: 'solid' }}>{auditedFactoriesCount}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ borderColor: 'black', borderWidth: '1px', borderStyle: 'solid', backgroundColor: '#00BBF2' }} colSpan={4}>ผลการตรวจ</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ borderColor: 'black', borderWidth: '1px', borderStyle: 'solid' }}>{text2}</TableCell>
                                <TableCell sx={{ borderColor: 'black', borderWidth: '1px', borderStyle: 'solid' }}>โรงงาน</TableCell>
                                <TableCell sx={{ borderColor: 'black', borderWidth: '1px', borderStyle: 'solid' }}>{passedCount}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ borderColor: 'black', borderWidth: '1px', borderStyle: 'solid' }}>{text1}</TableCell>
                                <TableCell sx={{ borderColor: 'black', borderWidth: '1px', borderStyle: 'solid' }}>โรงงาน</TableCell>
                                <TableCell sx={{ borderColor: 'black', borderWidth: '1px', borderStyle: 'solid' }}>{notPassedCount}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ borderColor: 'black', borderWidth: '1px', borderStyle: 'solid', backgroundColor: '#00BBF2' }} colSpan={4}>ผลการ Audit / ประเภทข้อบกพร่อง</TableCell>
                            </TableRow>

                            {summaryPlantData.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell sx={{ borderColor: 'black', borderWidth: '1px', borderStyle: 'solid' }}>{item.AUDIT_GROUP_NAME}</TableCell>
                                    <TableCell sx={{ borderColor: 'black', borderWidth: '1px', borderStyle: 'solid' }}>{item.DEFECT_STATUS}</TableCell>
                                    <TableCell sx={{ borderColor: 'black', borderWidth: '1px', borderStyle: 'solid' }}>{item.CAR_COUNT}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </div>
    );
}

export default SummaryPlanTable;
