"use client";
import React, { useState, useEffect } from "react";
import MealsTable from "@/app/ui/meal/meals-table/meals-table";
// import { useSearchParams } from 'next/navigation'

function Page() {
  // const searchParams = useSearchParams()
  // console.log(searchParams.get('search'))
  return (
    <div>
      <MealsTable />
    </div>
  );
}

export default Page;
