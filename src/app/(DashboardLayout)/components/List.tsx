"use client"
import {
    Typography, Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip
} from '@mui/material';
import DashboardCard from '@/app/(DashboardLayout)//components/shared/DashboardCard';
import { getAllList } from '@/api/medidic';
import { useEffect, useState } from 'react';
import { IMedicine } from '@/interface/medicine';
import { truncate } from '@/utils/common';
import { useRouter } from 'next/navigation';
import { IPageParams } from '@/interface/pagination';
import Pagination from '@mui/material/Pagination';



const List = () => {
    const router = useRouter();
    const [medicines, setMedicines] = useState<IMedicine[]>([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const findList = async () => {
        const skip = (page-1) * pageSize;
        const pageParams:IPageParams = {skip: skip, take: pageSize};
        const data = await getAllList(pageParams);
        setMedicines(data);
    }

    const changePageHandler = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    }

    useEffect(() => {
        findList();
    }, [page, pageSize])
    
    return (
        <DashboardCard title="의약품 데이터">
            <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
                <Table
                    aria-label="simple table"
                    sx={{
                        whiteSpace: "nowrap",
                        mt: 2
                    }}
                >
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    이름
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    제조사
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    효능
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {medicines.map((medicine) => (
                            <TableRow key={medicine.itemSeq} onClick={() => {router.push(`/detail/${medicine.itemSeq}`)}}>
                                <TableCell>
                                    <Typography
                                        sx={{
                                            fontSize: "15px",
                                            fontWeight: "500",
                                        }}
                                    >
                                        {truncate(20, medicine.itemName)}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Box>
                                            <Typography
                                                color="textSecondary"
                                                sx={{
                                                    fontSize: "13px",
                                                }}
                                            >
                                                {medicine.entpName}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                        {truncate(30, medicine.efcyQesitm)}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Pagination color="primary" count={pageSize} page={page} onChange={changePageHandler} showFirstButton={true} showLastButton={true} style={{display: "flex", justifyContent: "center"}} />
            </Box>
        </DashboardCard>
    );
};

export default List;
