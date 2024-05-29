'use client';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import { FC, ReactNode, useEffect, useState } from 'react';
import { deleteMedicineBySeq, getMedicineBySeq } from '@/api/medidic';
import { IMedicine } from '@/interface/medicine';
import BlankCard from '@/app/(DashboardLayout)/components/shared/BlankCard';
import { Typography, Grid, CardContent } from '@mui/material';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';

interface IDetail {
    itemSeq: number,
}
	
type PageProps = {
    params: IDetail;
    searchParams?: { [key: string]: string | string[] | undefined };
}

const Detail = (props: PageProps) => {
  const router = useRouter();
  const [medicine, setMedicine] = useState<IMedicine | null>();
  const getMedicine = async () => {
    const data = await getMedicineBySeq(Number(props.params.itemSeq));
    setMedicine(data);
  }

  const deleteMedicine = async (itemSeq: number) => {
    if(confirm("삭제하시겠습니까?")){
      await deleteMedicineBySeq(itemSeq)
      router.push("/")
    }
  }

  const clickEditButton = async (itemSeq: number) => {
    router.push(`/edit/${itemSeq}`)
  }

  useEffect(() => {
    getMedicine();
  }, [])

  return (
    <PageContainer title="Sample Page" description="this is Sample page">
      <DashboardCard title="">
        <Grid container spacing={3}>
          <Grid container item>
            <Grid item xs={12} sm={6} lg={10}>
              <Typography variant="h6" color="textprimary">{medicine?.itemName}</Typography>
            </Grid>
            {medicine?.itemSeq != null ?  
              <Grid xs={12} sm={6} lg={2}>
                <Button variant="contained" onClick={() => clickEditButton(medicine.itemSeq)}>Edit</Button>
                <Button variant="contained" color="error" style={{marginLeft: "10px"}} onClick={()=>deleteMedicine(medicine?.itemSeq)}>Delete</Button>
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
            <BlankCard>
              <CardContent>
                <Typography variant="h6" color="textprimary">효능</Typography>
                <Typography variant="body1" color="textprimary">{medicine?.efcyQesitm}</Typography>
              </CardContent>
            </BlankCard>
          </Grid>
          <Grid item sm={12}>
            <BlankCard>
              <CardContent>
                <Typography variant="h6" color="textprimary">사용법</Typography>
                <Typography variant="body1" color="textprimary">{medicine?.useMethodQesitm}</Typography>
              </CardContent>
            </BlankCard>
          </Grid>
          <Grid item sm={12}>
            <BlankCard>
              <CardContent>
                <Typography variant="h6" color="textprimary">주의사항</Typography>
                <Typography variant="body1" color="textprimary">{medicine?.atpnQesitm}</Typography>
              </CardContent>
            </BlankCard>
          </Grid>
          <Grid item sm={12}>
            <BlankCard>
              <CardContent>
                <Typography variant="h6" color="textprimary">상호작용</Typography>
                <Typography variant="body1" color="textprimary">{medicine?.intrcQesitm}</Typography>
              </CardContent>
            </BlankCard>
          </Grid>
          <Grid item sm={12}>
            <BlankCard>
              <CardContent>
                <Typography variant="h6" color="textprimary">부작용</Typography>
                <Typography variant="body1" color="textprimary">{medicine?.seQesitm}</Typography>
              </CardContent>
            </BlankCard>
          </Grid>
          <Grid item sm={12}>
            <BlankCard>
              <CardContent>
                <Typography variant="h6" color="textprimary">보관법</Typography>
                <Typography variant="body1" color="textprimary">{medicine?.depositMethodQesitm}</Typography>
              </CardContent>
            </BlankCard>
          </Grid>
        </Grid>
      </DashboardCard>
    </PageContainer>
  );
};

export default Detail;

