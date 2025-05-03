'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import {
    Box, TextField, Typography, Button, MenuItem, Grid, Card, CardContent,
} from '@mui/material';
import { useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation';

const periods = ['MORNING', 'LUNCH', 'AFTERNOON'];
const examinationTypes = ['REGULAR', 'VIP'];

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://appointment-service-e6za.onrender.com';

export default function AppointmentBookPage() {
    const searchParams = useSearchParams();
    const doctorId = searchParams.get('doctorId');

    const [schedules, setSchedules] = useState<{ id: number; date: string; period: string; startHour: string; endHour: string }[]>([]);
    const [selectedScheduleId, setSelectedScheduleId] = useState<number | null>(null);

    const [formData, setFormData] = useState({
        doctorId: doctorId ? parseInt(doctorId, 10) : 0,
        appointmentDate: '',
        period: '',
        startHour: '',
        endHour: '',
        examinationType: '',
        symptoms: '',
        patient: {
            fullName: '',
            dob: '',
            gender: 1,
            phone: '',
            province: '',
            district: '',
            ward: '',
            street: '',
            nationality: '',
        },
    });

    const [doctorName, setDoctorName] = useState('');
    const [loading, setLoading] = useState(false);

    // Fetch doctor info
    useEffect(() => {
        const fetchDoctor = async () => {
            if (!doctorId) return;

            setLoading(true);
            try {
                const res = await fetch(`${API_BASE_URL}/api/v1/doctors/${doctorId}`);
                const json = await res.json();
                setDoctorName(json.data?.fullName || 'Không rõ');
            } catch (err) {
                setDoctorName('Lỗi khi lấy tên bác sĩ');
            } finally {
                setLoading(false);
            }
        };

        fetchDoctor();
    }, [doctorId]);

    useEffect(() => {
        const fetchSchedules = async () => {
            const res = await fetch(
                `${API_BASE_URL}/api/v1/doctor-schedules/doctor/${doctorId}`
            );
            const data = await res.json();
            setSchedules(data.data.items);
        };

        fetchSchedules();
    }, [doctorId]);

    const handleScheduleClick = (schedule: any) => {
        setSelectedScheduleId(schedule.id);
        setFormData((prev) => ({
            ...prev,
            appointmentDate: schedule.date,
            period: schedule.period,
            startHour: schedule.startHour,
            endHour: schedule.endHour,
        }));

        console.log('Form data:', formData);
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" mt={5}>
                <CircularProgress />
            </Box>
        );
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        if (name in formData.patient) {
            setFormData({
                ...formData,
                patient: {
                    ...formData.patient,
                    [name]: value,
                },
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }

        console.log('Form data:', formData);
    };

    const router = useRouter();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        // Kiểm tra thủ công nếu cần
        if (!formData.appointmentDate || !formData.period || !formData.startHour || !formData.endHour || !formData.examinationType || !formData.symptoms) {
            alert('Vui lòng điền đầy đủ thông tin!');
            return;
        }
        if (!formData.patient.fullName || !formData.patient.dob || !formData.patient.phone || !formData.patient.street || !formData.patient.province || !formData.patient.district || !formData.patient.ward) {
            alert('Vui lòng điền đầy đủ thông tin bệnh nhân!');
            return;
        }

        try {
            const res = await fetch(`${API_BASE_URL}/api/v1/appointments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Đặt lịch thất bại');

            alert('Đặt lịch thành công!');

            console.log('Book response:', data);

            router.push(`/appointmentlist/patient/${data.data.patientId}`);
        } catch (err: any) {
            alert(`Lỗi: ${err.message}`);
        }
    };

    const formatTime = (time: string) => {
        if (!time) return "—";
        const [hours, minutes] = time.split(":");
        return `${parseInt(hours)}:${minutes}`;
    };

    return (
        <>
            <Box pl={6}>
                <Box display="flex" alignItems="center" sx={{ p: 2 }}>
                    <Typography variant="h5" sx={{ fontWeight: "bold", color: "#007bff", mr: 2 }}>
                        Book An Appointment
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: "bold", color: "#000000" }}>
                        {doctorName}
                    </Typography>
                </Box>
                <Grid container spacing={2}>
                    <Typography variant="subtitle1" sx={{ p: 2, fontWeight: "bold", color: "#000000" }}>Available Schedules</Typography>
                    {/* <Grid>
                    <TextField fullWidth label="Doctor ID" name="doctorId" value={formData.doctorId} disabled />
                </Grid> */}
                    {/* <Grid>
                    <TextField fullWidth label="Doctor Name" name="fullName" value={doctorName} disabled />
                </Grid> */}

                    <Grid container spacing={2}>
                        {schedules.map((s) => (
                            <Grid key={s.id}>
                                <Card
                                    variant="outlined"
                                    onClick={() => handleScheduleClick(s)}
                                    sx={{
                                        cursor: "pointer",
                                        borderColor: selectedScheduleId === s.id ? "primary.main" : "grey.300",
                                    }}
                                >
                                    <CardContent
                                        sx={{
                                            color: selectedScheduleId === s.id ? "primary.main" : "text.secondary",
                                        }}
                                    >
                                        <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>{s.date}</Typography>
                                        <Typography sx={{ fontSize: "13px", }}>{s.period.toLowerCase().charAt(0).toUpperCase() + s.period.toLowerCase().slice(1)}</Typography>
                                        <Typography sx={{ fontSize: "14px", }}>
                                            {formatTime(s.startHour)} - {formatTime(s.endHour)}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    {/* <Grid>
                    <TextField fullWidth required type="date" name="appointmentDate" label="Appointment Date" InputLabelProps={{ shrink: true }} onChange={handleChange} />
                </Grid>
                <Grid>
                    <TextField select fullWidth required name="period" value={formData.period || ''} label="Period" onChange={handleChange}>
                        {periods.map(p => <MenuItem key={p} value={p}>{p}</MenuItem>)}
                    </TextField>
                </Grid> */}

                    {/* <Grid>
                    <TextField fullWidth required type="time" name="startHour" label="Time Start" InputLabelProps={{ shrink: true }} onChange={handleChange} />
                </Grid>
                <Grid>
                    <TextField fullWidth required type="time" name="endHour" label="Time End" InputLabelProps={{ shrink: true }} onChange={handleChange} />
                </Grid> */}

                    <Grid container>
                        <Grid>
                            <TextField
                                select
                                fullWidth
                                required
                                name="examinationType"
                                value={formData.examinationType || ''}
                                label="Regular/VIP"
                                onChange={handleChange}
                                sx={{ minWidth: '150px' }}
                            >
                                {examinationTypes.map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
                            </TextField>
                        </Grid>

                        <Grid >
                            <TextField
                                sx={{ minWidth: '720px' }}
                                fullWidth required name="symptoms" label="Symstoms" onChange={handleChange} />
                        </Grid>
                    </Grid>

                    <Grid container mt={2}>
                        <Grid container>
                            <Typography variant="subtitle1" sx={{ pl: 2, fontWeight: "bold", color: "#000000" }}>Patient Details</Typography>

                            <Grid container>
                                <Grid>
                                    <TextField sx={{ minWidth: '400px' }} fullWidth required name="fullName" label="Full Name" onChange={handleChange} />
                                </Grid>
                                <Grid>
                                    <TextField fullWidth required type="date" name="dob" label="D.O.B" InputLabelProps={{ shrink: true }} onChange={handleChange} />
                                </Grid>
                                <Grid>
                                    <TextField select sx={{ minWidth: '150px' }} fullWidth required name="gender" value={formData.patient.gender} label="Gender" onChange={handleChange}>
                                        <MenuItem value={1}>Male</MenuItem>
                                        <MenuItem value={0}>Female</MenuItem>
                                    </TextField>
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid>
                                    <TextField
                                        fullWidth
                                        required
                                        name="phone"
                                        label="Phone"
                                        onChange={(e) => {
                                            const phone = e.target.value;
                                            if (/^\d{0,10}$/.test(phone)) {
                                                handleChange(e);
                                            }
                                        }}
                                    // helperText="Phone number must be 10 digits"
                                    />
                                </Grid>
                                <Grid>
                                    <TextField fullWidth required name="nationality" label="Nationality" onChange={handleChange} />
                                </Grid>
                                <Grid>
                                    <TextField fullWidth required name="province" label="City/Province" onChange={handleChange} />
                                </Grid>
                                <Grid>
                                    <TextField fullWidth required name="district" label="District" onChange={handleChange} />
                                </Grid>
                                <Grid>
                                    <TextField fullWidth required name="ward" label="Ward" onChange={handleChange} />
                                </Grid>
                                <Grid>
                                    <TextField fullWidth required name="street" label="Street" onChange={handleChange} />
                                </Grid>
                            </Grid>
                        </Grid>

                    </Grid>

                    <Grid>
                        <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
                            Book
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}
