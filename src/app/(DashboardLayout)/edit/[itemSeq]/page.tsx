'use client';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import { FC, FormEvent, ReactNode, useEffect, useState } from 'react';
import { deleteMedicineBySeq, getMedicineBySeq } from '@/api/medidic';
import { IMedicine, medicineInputObj } from '@/interface/medicine';
import BlankCard from '@/app/(DashboardLayout)/components/shared/BlankCard';
import { Typography, Grid, CardContent } from '@mui/material';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import { useImmer } from 'use-immer';

interface IDetail {
    itemSeq: number,
}
	
type PageProps = {
    params: IDetail;
    searchParams?: { [key: string]: string | string[] | undefined };
}

const Edit = (props: PageProps) => {
    const router = useRouter();
    const [medicine, updateMedicine] = useImmer(medicineInputObj);
    const getMedicine = async () => {
    const data = await getMedicineBySeq(Number(props.params.itemSeq));
        if(data != null) updateMedicine(data);
    }

  const deleteMedicine = async (itemSeq: number) => {
    if(confirm("삭제하시겠습니까?")){
      await deleteMedicineBySeq(itemSeq)
      router.push("/")
    }
  }

  const onSubmit = () => {
    console.log(`onsubmit: ${medicine}`)
  }

  useEffect(() => {
    getMedicine();
  }, [])

  return (
    <PageContainer title="Sample Page" description="this is Sample page">
      <DashboardCard title="">
        <Grid container spacing={3}>
            <Grid container item>
                <Grid item xs={12} sm={6} lg={11}>
                <Typography variant="h6" color="textprimary">{medicine?.itemName}</Typography>
                </Grid>
                {medicine?.itemSeq != null ?  
                <Grid xs={12} sm={6} lg={1}>
                    <Button variant="contained" onClick={() => onSubmit}>Save</Button>
                </Grid>
                : null
                }
            </Grid>
            <Grid item sm={12}>
                <BlankCard>
                <CardContent>
                    <Typography variant="h6" color="textprimary">제조사</Typography>
                    <Typography variant="body1" color="textprimary">{medicine?.entpName}</Typography>
                </CardContent>
                </BlankCard>
            </Grid>
            <Grid item sm={12}>
                <TextField id="outlined-basic" label="효능" variant="outlined" name='efcyQesitm' fullWidth multiline rows={4} defaultValue={medicine?.efcyQesitm} 
                    // onChange={(e) => console.log(e.target.value)}
                    onChange={(e) => updateMedicine(draft => draft.efcyQesitm = e.target.value)}
                />
            </Grid>
            <Grid item sm={12}>
                <TextField id="outlined-basic" label="사용법" variant="outlined" name='useMethodQesitm' fullWidth multiline rows={4} defaultValue={medicine?.useMethodQesitm}
                    onChange={(e) => updateMedicine(draft => {
                        draft.useMethodQesitm = e.currentTarget.value
                    })}
                />
            </Grid>
            <Grid item sm={12}>
                <TextField id="outlined-basic" label="주의사항" variant="outlined" name='atpnQesitm' fullWidth multiline rows={4} defaultValue={medicine?.atpnQesitm}/>
            </Grid>
            <Grid item sm={12}>
                <TextField id="outlined-basic" label="상호작용" variant="outlined" name='intrcQesitm' fullWidth multiline rows={4} defaultValue={medicine?.intrcQesitm}/>
            </Grid>
            <Grid item sm={12}>
                <TextField id="outlined-basic" label="부작용" variant="outlined" name='seQesitm' fullWidth multiline rows={4} defaultValue={medicine?.seQesitm}/>
            </Grid>
            <Grid item sm={12}>
                <TextField id="outlined-basic" label="보관법" variant="outlined" name='depositMethodQesitm' fullWidth multiline rows={4} defaultValue={medicine?.depositMethodQesitm}/>
            </Grid>
        </Grid>
      </DashboardCard>
    </PageContainer>
  );
};

export default Edit;

