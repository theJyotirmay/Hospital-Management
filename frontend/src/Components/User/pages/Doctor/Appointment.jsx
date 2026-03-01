import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getpatient } from "../../slices/patientSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import { Typography, Card, CardContent, Button, Chip, Stack } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import PageShell from "../../layout/PageShell";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: alpha(theme.palette.primary.main, 0.12),
    color: theme.palette.text.primary,
    fontWeight: 900,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },

  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function Cart() {
  const theme = useTheme();
  const navigate = useNavigate()
  const [id, setId] = React.useState(null);

  const [selectedInvoice, setSelectedInvoice] = React.useState(null);

  const dispatch = useDispatch();
  const tokens = localStorage.getItem("jwt");

  const MakePayment = async (id) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/patient/payment",
        {
          status: "paid",
          _id: id,
        },
        {
          headers: {
            authorization: tokens,
          },
        }
      );

      console.log(response.data);
      toast.success("payment successfull!!!");
      setId(null);
    } catch (error) {
      console.log(error.message);
    }
  };
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handleRazorpayPayment = async (payId, amount) => {
    const res = await loadRazorpay();
    if (!res) {
      toast.error("Razorpay SDK failed to load");
      return;
    }

    try {
      const { data } = await axios.post(
        "http://localhost:8080/patient/create-razorpay-order",
        { amount },
        {
          headers: {
            authorization: tokens,
          },
        }
      );

      const options = {
        key: "rzp_test_1DP5mmOlF5G5ag", // Dummy test key
        amount: data.amount,
        currency: data.currency,
        name: "Hospital Management",
        description: "Test Transaction",
        order_id: data.id,
        handler: function (response) {
          MakePayment(payId);
        },
        prefill: {
          name: "Patient",
          email: "patient@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const paymentObject = new window.Razorpay(options);

      // Handle modal closure
      paymentObject.on('payment.failed', function (response) {
        toast.error("Payment Failed");
      });

      paymentObject.open();
    } catch (err) {
      console.error(err);
      toast.error("Could not create Razorpay order");
    }
  };

  const appointment = useSelector((state) => state.patient);
  console.log(appointment.list.user_appointments);

  React.useEffect(() => {
    dispatch(getpatient());
  }, [dispatch, id]);

  React.useEffect(() => {
    if (id && selectedInvoice) {
      handleRazorpayPayment(id, selectedInvoice);
      // Reset selectedInvoice immediately so reopening works if they close
      setSelectedInvoice(null);
    }
  }, [id, selectedInvoice]);

  return (
    <PageShell
      title="Your appointments"
      subtitle="Pay invoices and access your medical reports."
      maxWidth="lg"
    >
      <Card
        elevation={0}
        sx={{
          borderRadius: 5,
          border: `1px solid ${alpha(theme.palette.text.primary, 0.08)}`,
          overflow: 'hidden',
          backgroundColor: alpha(theme.palette.background.paper, 0.9),
        }}
      >
        <CardContent sx={{ p: { xs: 2, md: 3 } }}>
          {!appointment?.list?.user_appointments?.length ? (
            <Typography sx={{ color: 'text.secondary', textAlign: 'center', py: 6 }}>
              No appointments found yet.
            </Typography>
          ) : (
            <TableContainer component={Paper} elevation={0}>
              <Table sx={{ minWidth: 720 }} aria-label="appointments table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Doctor</StyledTableCell>
                    <StyledTableCell align="left">Chief Complaints</StyledTableCell>
                    <StyledTableCell align="left">Date</StyledTableCell>
                    <StyledTableCell align="left">Invoice</StyledTableCell>
                    <StyledTableCell align="left">Payment</StyledTableCell>
                    <StyledTableCell align="left">Report</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {appointment?.list?.user_appointments?.map((item) => {
                    const isPaid = item?.payment === 'paid';
                    return (
                      <StyledTableRow key={item._id}>
                        <StyledTableCell align="left">{item?.doctor?.name}</StyledTableCell>
                        <StyledTableCell align="left">{item?.chief_complaints}</StyledTableCell>
                        <StyledTableCell align="left">
                          {moment.utc(item?.date).format('MM/DD/YYYY')}
                        </StyledTableCell>
                        <StyledTableCell align="left">{item?.doctor?.ammount}</StyledTableCell>
                        <StyledTableCell align="left">
                          {isPaid ? (
                            <Chip label="Paid" size="small" color="success" variant="outlined" />
                          ) : (
                            <Button
                              size="small"
                              variant="contained"
                              onClick={() => {
                                setId(item?._id);
                                setSelectedInvoice(item?.doctor?.ammount);
                              }}
                            >
                              Pay with Razorpay
                            </Button>
                          )}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Button
                              size="small"
                              variant="outlined"
                              disabled={!isPaid}
                              onClick={() => navigate(`/report/${item._id}`)}
                            >
                              View
                            </Button>
                            {!isPaid && (
                              <Typography sx={{ color: 'text.secondary' }}>
                                Pending
                              </Typography>
                            )}
                          </Stack>
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>
    </PageShell>
  );
}
