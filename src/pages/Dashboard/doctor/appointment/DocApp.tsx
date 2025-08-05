import React from 'react';
import AppointDet from './components/AppointDet';
import ConsultationN from './components/ConsultationN';
import PatientVital from './components/PatientVital';

const DocApp = () => {
    return (
        <div>
         <AppointDet/>
         <PatientVital/>
         <ConsultationN/>
        </div>
    );
};

export default DocApp;