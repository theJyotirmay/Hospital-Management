import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import DoctorCard from "./Doctorcard";
import { Grid } from "@mui/material";
import Loading from "../../Loading";
import { getdoctor } from "../../slices/getDoctor";
import { useDispatch, useSelector } from "react-redux";
import PageShell from "../../layout/PageShell";

const Doctor = () => {
  const dispatch = useDispatch();
  const datas = useSelector((state) => state.doctor);
  const { doctor, isLoading, error } = datas;

  useEffect(() => {
    dispatch(getdoctor());
  }, []);

  return (
    <>
      <Loading isloading={isLoading} />
      <PageShell
        title="Our Doctors"
        subtitle="Find the right specialist and book an appointment in minutes."
      >
        <Grid container spacing={2.5}>
          {doctor?.doctors?.map((item) => (
            <Grid key={item._id} item xs={12} sm={6} md={3}>
              <DoctorCard item={item} />
            </Grid>
          ))}
        </Grid>
      </PageShell>
    </>
  );
};

export default Doctor;
