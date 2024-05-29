'use server'
import { IMedicine } from "@/interface/medicine";
import { IPageParams } from "@/interface/pagination";
import { prisma } from "./client";

// 데이터 목록 조회
export async function getAllList(pageParams:IPageParams) {
    const {skip, take} = pageParams;
    const lists = await prisma.medic.findMany({
        skip,
        take,
        where: {
            deleted: false
        }
    });
    return lists;
}

// 데이터 단건 조회
export async function getMedicineBySeq(itemSeq: number) {
    const data = await prisma.medic.findUnique({
        where: {
            itemSeq: itemSeq
        }
    })
    return data;
}

// 데이터 삭제
export async function deleteMedicineBySeq(itemSeq: number) {
    const data = await prisma.medic.update({
        where: {
            itemSeq: itemSeq
        },
        data: {
            deleted: true
        }
    })
    return data;
}