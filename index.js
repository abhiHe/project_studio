// index.js
// ── KrimeWatch kwcommon — Express API entry point ─────────────────────
'use strict';

require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const app     = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// ── Health check ──────────────────────────────────────────────────────
app.get('/health', (req, res) => res.json({ status: 'ok', ts: new Date() }));

// ── Route registrations (one per original PHP file) ───────────────────
// Group A: Auth, Login, Register, Verify, Reset, Dashboard, Profile

app.use('/ws_an_login',                  require('./routes/ws_an_login'));
app.use('/ws_an_register',               require('./routes/ws_an_register'));
app.use('/ws_an_weblogin',               require('./routes/ws_an_weblogin'));
app.use('/ws_an_monitorlogin',           require('./routes/ws_an_monitorlogin'));
app.use('/ws_an_approverlogin',          require('./routes/ws_an_approverlogin'));
app.use('/ws_an_employeelogin',          require('./routes/ws_an_employeelogin'));
app.use('/ws_an_csusrlogin',             require('./routes/ws_an_csusrlogin'));
app.use('/ws_an_vsgrouplogin',           require('./routes/ws_an_vsgrouplogin'));
app.use('/ws_an_monitor_volunteer_login',require('./routes/ws_an_monitor_volunteer_login'));
app.use('/ws_an_videoslogin',            require('./routes/ws_an_videoslogin'));
app.use('/cclogin',                      require('./routes/cclogin'));
app.use('/controlRoomLogin',             require('./routes/controlRoomLogin'));
app.use('/ws_login',                     require('./routes/ws_login'));
app.use('/volunteerlogin',               require('./routes/volunteerlogin'));
app.use('/ws_an_jwauth',                 require('./routes/ws_an_jwauth'));
app.use('/appsAuthToken',                require('./routes/appsAuthToken'));
app.use('/authToken',                    require('./routes/authToken'));
app.use('/refresh-token',                require('./routes/refresh-token'));
app.use('/ws_an_getAuthCode',            require('./routes/ws_an_getAuthCode'));
app.use('/ws_an_checksecrectkey',        require('./routes/ws_an_checksecrectkey'));
app.use('/ws_an_checkid',                require('./routes/ws_an_checkid'));
app.use('/ws_getencryptkey',             require('./routes/ws_getencryptkey'));
app.use('/verify',                       require('./routes/verify'));
app.use('/monitorverify',                require('./routes/monitorverify'));
app.use('/monitorGoogleVerify',          require('./routes/monitorGoogleVerify'));
app.use('/volunteerverify',              require('./routes/volunteerverify'));
app.use('/approververify',               require('./routes/approververify'));
app.use('/averify',                      require('./routes/averify'));
app.use('/add_an_verify',                require('./routes/add_an_verify'));
app.use('/add_as_verify',                require('./routes/add_as_verify'));
app.use('/add_verifyadd',                require('./routes/add_verifyadd'));
app.use('/ws_an_verifyadd',              require('./routes/ws_an_verifyadd'));
app.use('/ws_an_verifyaddress1',         require('./routes/ws_an_verifyaddress1'));
app.use('/ws_an_VG_Verifyadd',           require('./routes/ws_an_VG_Verifyadd'));
app.use('/ccverify',                     require('./routes/ccverify'));
app.use('/ws_verifycode',                require('./routes/ws_verifycode'));
app.use('/ws_verifydeviceid',            require('./routes/ws_verifydeviceid'));
app.use('/ws_monitorverifydeviceid',     require('./routes/ws_monitorverifydeviceid'));
app.use('/ws_an_resetpassword',          require('./routes/ws_an_resetpassword'));
app.use('/ws_an_monitor_reset',          require('./routes/ws_an_monitor_reset'));
app.use('/ws_an_ad_reset',               require('./routes/ws_an_ad_reset'));
app.use('/ccreset',                      require('./routes/ccreset'));
app.use('/ws_monitorforgetpass',         require('./routes/ws_monitorforgetpass'));
app.use('/ws_monitorregister',           require('./routes/ws_monitorregister'));
app.use('/ws_monitorrreset',             require('./routes/ws_monitorrreset'));
app.use('/ws_forgot_pass',               require('./routes/ws_forgot_pass'));
app.use('/ws_reset',                     require('./routes/ws_reset'));
app.use('/ws_changepass',                require('./routes/ws_changepass'));
app.use('/ws_an_admindash',              require('./routes/ws_an_admindash'));
app.use('/ccdashboard',                  require('./routes/ccdashboard'));
app.use('/m_support_home',               require('./routes/m_support_home'));
app.use('/ws_an_updateprofile',          require('./routes/ws_an_updateprofile'));
app.use('/ccprofileUpdate',              require('./routes/ccprofileUpdate'));

// Group B: Volunteers, Officers, Control Room, Users, Approvers

app.use('/ws_an_volunteerregister',      require('./routes/ws_an_volunteerregister'));
app.use('/ws_an_Voluntreeprofileregister',require('./routes/ws_an_Voluntreeprofileregister'));
app.use('/ws_an_addVolunteer',           require('./routes/ws_an_addVolunteer'));
app.use('/ws_an_volunteer_profile',      require('./routes/ws_an_volunteer_profile'));
app.use('/ws_an_volunteer_groupprofile', require('./routes/ws_an_volunteer_groupprofile'));
app.use('/ws_an_volunteerdash',          require('./routes/ws_an_volunteerdash'));
app.use('/voluntreedetailes',            require('./routes/voluntreedetailes'));
app.use('/volutreeapprove',              require('./routes/volutreeapprove'));
app.use('/volutreeapprove1',             require('./routes/volutreeapprove1'));
app.use('/volutreereject',               require('./routes/volutreereject'));
app.use('/ws_an_monitorapprove',         require('./routes/ws_an_monitorapprove'));
app.use('/ws_an_monitorrelocate',        require('./routes/ws_an_monitorrelocate'));
app.use('/ws_an_monitorlist',            require('./routes/ws_an_monitorlist'));
app.use('/ws_an_monitorvideo',           require('./routes/ws_an_monitorvideo'));
app.use('/ws_an_approverregister',       require('./routes/ws_an_approverregister'));
app.use('/ws_an_approverlist',           require('./routes/ws_an_approverlist'));
app.use('/ws_an_applyprofile',           require('./routes/ws_an_applyprofile'));
app.use('/appliedStatus',                require('./routes/appliedStatus'));
app.use('/ws_an_vgroupapprove',          require('./routes/ws_an_vgroupapprove'));
app.use('/ws_an_vsgroupapprove',         require('./routes/ws_an_vsgroupapprove'));
app.use('/ws_an_vsgroupreject',          require('./routes/ws_an_vsgroupreject'));
app.use('/vsgroupdetails',               require('./routes/vsgroupdetails'));
app.use('/ws_an_adminvsgrouplist',       require('./routes/ws_an_adminvsgrouplist'));
app.use('/ws_an_adminvslist',            require('./routes/ws_an_adminvslist'));
app.use('/ws_an_vslist',                 require('./routes/ws_an_vslist'));
app.use('/ws_an_vscaseslist',            require('./routes/ws_an_vscaseslist'));
app.use('/ws_an_vslistevents',           require('./routes/ws_an_vslistevents'));
app.use('/ws_an_vsgropeventslist',       require('./routes/ws_an_vsgropeventslist'));
app.use('/ws_an_vsgropupdateprofile',    require('./routes/ws_an_vsgropupdateprofile'));
app.use('/ws_an_vsgroupcase',            require('./routes/ws_an_vsgroupcase'));
app.use('/ws_an_vsgroupaddalert',        require('./routes/ws_an_vsgroupaddalert'));
app.use('/ws_an_policestation',          require('./routes/ws_an_policestation'));
app.use('/ws_an_controlroom_profile',    require('./routes/ws_an_controlroom_profile'));
app.use('/ws_an_controlroomlist',        require('./routes/ws_an_controlroomlist'));
app.use('/ws_an_controlroomlist1',       require('./routes/ws_an_controlroomlist1'));
app.use('/ccprofile',                    require('./routes/ccprofile'));
app.use('/ccstateandcountry',            require('./routes/ccstateandcountry'));
app.use('/ws_an_subscriber_profile',     require('./routes/ws_an_subscriber_profile'));
app.use('/ws_an_adminhqlist',            require('./routes/ws_an_adminhqlist'));
app.use('/ws_an_profilerenewelupdate',   require('./routes/ws_an_profilerenewelupdate'));
app.use('/ws_an_relocateaddress',        require('./routes/ws_an_relocateaddress'));
app.use('/ws_an_relocateaddress1',       require('./routes/ws_an_relocateaddress1'));
app.use('/onetimeregister',              require('./routes/onetimeregister'));
app.use('/ws_register',                  require('./routes/ws_register'));
app.use('/ws_an_addcaseuser',            require('./routes/ws_an_addcaseuser'));
app.use('/ws_an_profilenotification',    require('./routes/ws_an_profilenotification'));
app.use('/ws_an_actionteam',             require('./routes/ws_an_actionteam'));
app.use('/ws_actiondropdown',            require('./routes/ws_actiondropdown'));
app.use('/ws_actionlist',                require('./routes/ws_actionlist'));
app.use('/ws_actionrequest',             require('./routes/ws_actionrequest'));
app.use('/ws_verifyactionteam',          require('./routes/ws_verifyactionteam'));
app.use('/ws_an_drop',                   require('./routes/ws_an_drop'));
app.use('/ws_an_dropdown',               require('./routes/ws_an_dropdown'));
app.use('/statusChange',                 require('./routes/statusChange'));
app.use('/addapprover',                  require('./routes/addapprover'));

// Group C: Devices, Alerts, Amber, Cases, Investigations, Events, Tracking

app.use('/device-create',                require('./routes/device-create'));
app.use('/device-disable',               require('./routes/device-disable'));
app.use('/device-update',                require('./routes/device-update'));
app.use('/cameraRegistration',           require('./routes/cameraRegistration'));
app.use('/save_device_token',            require('./routes/save_device_token'));
app.use('/ws_an_device_confirm',         require('./routes/ws_an_device_confirm'));
app.use('/ws_an_device_confirm1',        require('./routes/ws_an_device_confirm1'));
app.use('/ws_an_addalert',               require('./routes/ws_an_addalert'));
app.use('/ws_an_alert',                  require('./routes/ws_an_alert'));
app.use('/ws_an_alertmap',               require('./routes/ws_an_alertmap'));
app.use('/sendalert',                    require('./routes/sendalert'));
app.use('/allalerts',                    require('./routes/allalerts'));
app.use('/alert_play_list',              require('./routes/alert_play_list'));
app.use('/my_ws_an_alertcount',          require('./routes/my_ws_an_alertcount'));
app.use('/my_ws_an_emergencyalert',      require('./routes/my_ws_an_emergencyalert'));
app.use('/my_ws_an_emergencycount',      require('./routes/my_ws_an_emergencycount'));
app.use('/my_ws_an_emergncylist',        require('./routes/my_ws_an_emergncylist'));
app.use('/ws_emergency',                 require('./routes/ws_emergency'));
app.use('/ws_an_amberdetails',           require('./routes/ws_an_amberdetails'));
app.use('/ws_an_amberevents',            require('./routes/ws_an_amberevents'));
app.use('/ws_an_amberevents_1',          require('./routes/ws_an_amberevents_1'));
app.use('/ws_an_ambersearch',            require('./routes/ws_an_ambersearch'));
app.use('/ws_amberdropdown',             require('./routes/ws_amberdropdown'));
app.use('/amberalert',                   require('./routes/amberalert'));
app.use('/send_amber',                   require('./routes/send_amber'));
app.use('/inactivateAmberAlert',         require('./routes/inactivateAmberAlert'));
app.use('/ws_updateamber',               require('./routes/ws_updateamber'));
app.use('/warning',                      require('./routes/warning'));
app.use('/checkwarning',                 require('./routes/checkwarning'));
app.use('/createCase',                   require('./routes/createCase'));
app.use('/ws_an_casedetails',            require('./routes/ws_an_casedetails'));
app.use('/ws_an_casesreports',           require('./routes/ws_an_casesreports'));
app.use('/caseOfficerReset',             require('./routes/caseOfficerReset'));
app.use('/VolunteerCasesCreation',       require('./routes/VolunteerCasesCreation'));
app.use('/investigation',                require('./routes/investigation'));
app.use('/missingDetails',               require('./routes/missingDetails'));
app.use('/controlRoomEvents',            require('./routes/controlRoomEvents'));
app.use('/controlRoomEventUpdates',      require('./routes/controlRoomEventUpdates'));
app.use('/controlRoomMonitor',           require('./routes/controlRoomMonitor'));
app.use('/my_ws_an_eventcount',          require('./routes/my_ws_an_eventcount'));
app.use('/my_ws_an_eventslist',          require('./routes/my_ws_an_eventslist'));
app.use('/showevent',                    require('./routes/showevent'));
app.use('/autorefresh',                  require('./routes/autorefresh'));
app.use('/newtracking',                  require('./routes/newtracking'));
app.use('/ws_tracking',                  require('./routes/ws_tracking'));
app.use('/ws_updatetrack',               require('./routes/ws_updatetrack'));
app.use('/ws_an_searchtraffic',          require('./routes/ws_an_searchtraffic'));
app.use('/ws_an_trafficviolation',       require('./routes/ws_an_trafficviolation'));
app.use('/crimeData',                    require('./routes/crimeData'));
app.use('/crimeData1',                   require('./routes/crimeData1'));
app.use('/singleCrimeData',              require('./routes/singleCrimeData'));
app.use('/crimeProcessedData',           require('./routes/crimeProcessedData'));
app.use('/workingcrimeData',             require('./routes/workingcrimeData'));

// Group D: Payments, Ads, News, Notifications, Videos, Reports, Files, Misc

app.use('/ws_an_payment',                require('./routes/ws_an_payment'));
app.use('/payment',                      require('./routes/payment'));
app.use('/payment-successful',           require('./routes/payment-successful'));
app.use('/apple-pay-payment',            require('./routes/apple-pay-payment'));
app.use('/ws_an_renewal',                require('./routes/ws_an_renewal'));
app.use('/ws_renew',                     require('./routes/ws_renew'));
app.use('/ws_subscriptionstatus',        require('./routes/ws_subscriptionstatus'));
app.use('/ws_canceldeactivate',          require('./routes/ws_canceldeactivate'));
app.use('/ws_deactivate',                require('./routes/ws_deactivate'));
app.use('/ws_an_adslides',               require('./routes/ws_an_adslides'));
app.use('/ws_an_advertiseupload',        require('./routes/ws_an_advertiseupload'));
app.use('/ws_an_update_myads',           require('./routes/ws_an_update_myads'));
app.use('/ws_banners',                   require('./routes/ws_banners'));
app.use('/ws_an_addnews',                require('./routes/ws_an_addnews'));
app.use('/ws_an_viewnews',               require('./routes/ws_an_viewnews'));
app.use('/ws_an_newsletter',             require('./routes/ws_an_newsletter'));
app.use('/ws_notifications',             require('./routes/ws_notifications'));
app.use('/notifications',                require('./routes/notifications'));
app.use('/my_ws_an_feedback',            require('./routes/my_ws_an_feedback'));
app.use('/ws_an_feedback',               require('./routes/ws_an_feedback'));
app.use('/m_support',                    require('./routes/m_support'));
app.use('/support',                      require('./routes/support'));
app.use('/ws_an_videos',                 require('./routes/ws_an_videos'));
app.use('/ws_an_videoslist',             require('./routes/ws_an_videoslist'));
app.use('/video',                        require('./routes/video'));
app.use('/video_1',                      require('./routes/video_1'));
app.use('/video_selection',              require('./routes/video_selection'));
app.use('/showallvideos',                require('./routes/showallvideos'));
app.use('/uploadVideoStatus',            require('./routes/uploadVideoStatus'));
app.use('/ws_an_activitieslist',         require('./routes/ws_an_activitieslist'));
app.use('/ws_an_search',                 require('./routes/ws_an_search'));
app.use('/ws_search',                    require('./routes/ws_search'));
app.use('/ws_an_fir_print',              require('./routes/ws_an_fir_print'));
app.use('/ws_an_print_fir',              require('./routes/ws_an_print_fir'));
app.use('/ws_an_cfireview',              require('./routes/ws_an_cfireview'));
app.use('/ws_an_fireview',               require('./routes/ws_an_fireview'));
app.use('/importfile',                   require('./routes/importfile'));
app.use('/ws_offlinedata',               require('./routes/ws_offlinedata'));
app.use('/ws_offlinedata2',              require('./routes/ws_offlinedata2'));
app.use('/ws_offlinedata3',              require('./routes/ws_offlinedata3'));
app.use('/ws_onlineupload',              require('./routes/ws_onlineupload'));
app.use('/my_ws_map',                    require('./routes/my_ws_map'));
app.use('/ws_counter',                   require('./routes/ws_counter'));
app.use('/profile_image',                require('./routes/profile_image'));
app.use('/upload',                       require('./routes/upload'));
app.use('/UploadToServer',               require('./routes/UploadToServer'));
app.use('/UploadMultipleRecord',         require('./routes/UploadMultipleRecord'));
app.use('/barcode',                      require('./routes/barcode'));
app.use('/ws_an_addnews',                require('./routes/ws_an_addnews'));
app.use('/tesfile',                      require('./routes/tesfile'));
app.use('/test1',                        require('./routes/test1'));
app.use('/testencrypt',                  require('./routes/testencrypt'));

// ── 404 fallback ──────────────────────────────────────────────────────
app.use((req, res) => res.status(404).json([{ error: true, message: 'Route not found' }]));

// ── Global error handler ──────────────────────────────────────────────
app.use((err, req, res, _next) => {
  console.error(err);
  res.status(500).json([{ error: true, message: err.message || 'Internal server error' }]);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`KrimeWatch kwcommon API running on port ${PORT}`));

module.exports = app;
