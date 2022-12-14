import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Card,
  Row,
  Col,
  Image,
  Button,
  ThemeProvider,
  FloatingLabel,
  Accordion,
} from "react-bootstrap";
import { motion } from "framer-motion";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ImageToText from "../components/ImageToText";
import PdfToText from "../components/PdfToText";
import Form from "react-bootstrap/Form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import JsPDF from "jspdf";
import { BackToTopBtn } from "../components/BackToTopBtn";
import defaultLogo from "../icon/Logo_superhr.png";
import "../fonts/THSarabunNew-normal";
import html2canvas from "html2canvas";
export const NewApplicant = () => {
  const ref = useRef(null);
  const [divHeight, setDivHeight] = useState(448);
  const [oriFileSize, setOriFileSize] = useState(0);
  const [genFileSize, setGenFileSize] = useState(0);
  const [totalFileSize, setTotalFileSize] = useState(0);
  const [img, setImg] = useState(defaultLogo);
  const onImageChange = (e) => {
    const [file] = e.target.files;
    setImg(URL.createObjectURL(file));
  };
  const genfileChangedHandler = (file) => {
    let file_size = file.target.files[0].size;
    setGenFileSize(file_size);
    setTotalFileSize(formatBytes(oriFileSize + genFileSize));
  };
  const orifileChangedHandler = (file) => {
    let file_size = file.target.files[0].size;
    setOriFileSize(file_size);
    setTotalFileSize(formatBytes(oriFileSize + genFileSize));
  };
  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  const generatePDF = async () => {
    const input = document.querySelector("#report");
    html2canvas(input, {
      quality: 2,
      scale: 2,
      logging: true,
      letterRendering: 1,
      useCORS: true,
    }).then((canvas) => {
      var scaleBy = 5;
      const imgWidth = document.querySelector("#report").clientWidth;
      // const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const imgHeight = document.querySelector("#report").clientHeight;
      // console.log(imgWidth);
      // console.log(imgHeight);
      const imgData = canvas.toDataURL("img/png");
      const pdf = new JsPDF("p", "px", [imgWidth, imgHeight]);
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(position + "-" + currName.split(" ")[0] +  " " +currName.split(" ")[1] + "-" +currDate.toString().substring(8,10)+currDate.toString().substring(4,7) +  currDate.toString().substring(11,15)+  "-report.pdf");
      console.log(); 
    });
  };
  const warnNumberNotify = () => {
    toast.warn("Cannot insert Number into this field", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 1500,
    });
  };
  const warnTextNotify = () => {
    toast.warn("Cannot insert Text into this field", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 1500,
    });
  };
  const resetNotify = () => {
    toast.success("Reset Information", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 1500,
    });
  };

  const warnCapitalNotify = () => {
    toast.warn("Do not use all capital letters to type candidate's name", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 1500,
    });
  };

  const warnFirstCapitalNotify = () => {
    toast.warn("Name should start  with capital letter", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 1500,
    });
  };
  const warnFirstSkillNotify = () => {
    toast.warn("Skill should start  with capital letter", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 1500,
    });
  };
  const warnThaiNotify = () => {
    toast.warn("Please enter English in input fields", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 1500,
    });
  };
  const warnEngNotify = () => {
    toast.warn("Please enter Thai in input fields", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 1500,
    });
  };

  const warnEmptyNotify = () => {
    toast.warn("Please enter all required input fields", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 1500,
    });
  };

  const langOptions = [
    { value: "English", label: "English" },
    { value: "Chinese", label: "Chinese" },
    { value: "Arabic", label: "Arabic" },
    { value: "Bengali", label: "Bengali" },
    { value: "German", label: "German" },
    { value: "Hindi", label: "Hindi" },
    { value: "Japanese", label: "Japanese" },
    { value: "Korean", label: "Korean" },
    { value: "Malay", label: "Malay" },
    { value: "Protuguese", label: "Protuguese" },
    { value: "Russian", label: "Russian" },
    { value: "Spanish", label: "Spanish" },
    { value: "Others", label: "Others" },
  ];

  const proficientOptions = [
    { value: "Fluent/Native", label: "Fluent/Native" },
    { value: "Good", label: "Good" },
    { value: "Fair", label: "Fair" },
    { value: "Basic", label: "Basic" },
  ];

  const statusOptions = [
    { value: "Not interested", label: "Not interested" },
    { value: "Not Qualified", label: "Not Qualified" },
    { value: "Qualified", label: "Qualified" },
    { value: "Selected", label: "Selected" },
  ];

  const genderOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Others", label: "Others" },
    { value: "N/A", label: "N/A" },
  ];

  const maritalOptions = [
    { value: "Married", label: "Married" },
    { value: "Single", label: "Single" },
    { value: "Divorced", label: "Divorced" },
    { value: "Widowed", label: "Widowed" },
    { value: "Separated", label: "Separated" },
    { value: "N/A", label: "N/A" },
  ];

  const [langValue, setLangValue] = useState(null);
  const [proficientValue, setProficientValue] = useState(null);
  const [statusValue, setStatusValue] = useState(null);
  const [genderValue, setGenderValue] = useState(null);
  const [maritalValue, setMaritalValue] = useState(null);

  const langSelectChange = (langValue) => {
    setLangValue(langValue);
  };

  const profSelectChange = (proficientValue) => {
    setProficientValue(proficientValue);
  };

  const statSelectChange = (statusValue) => {
    setStatusValue(statusValue);
  };

  const genderSelectChange = (genderValue) => {
    setGenderValue(genderValue);
  };

  const maritalSelectChange = (maritalValue) => {
    setMaritalValue(maritalValue);
  };
  const [currDate, setCurrDate] = useState(new Date());
  const [currName, setCurrName] = useState("");
  const [currThaiName, setCurrThaiName] = useState("");
  const [position, setPosition] = useState("");
  const [expPosition, setExpPosition] = useState("");
  const [expProject, setExpProject] = useState("");
  const [expCompany, setExpCompany] = useState("");
  const [industry, setIndustry] = useState("");
  const [certificate, setCertificate] = useState("");
  const [responsibility, setResponsibility] = useState("");
  const [splitRes, setSplitRes] = useState([]);
  const [degree, setDegree] = useState("");
  const [gradYear, setGradYear] = useState("");
  const [univ, setUniv] = useState("");
  const [gpa, setGPA] = useState("");
  const degreeChangeHandle = (degree) => {
    var re = new RegExp(
      "^([A-Z]|[a-z]|[0-9]|[/]|[\\]|[ ]|[]|[\n]|[.]&[?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????])+$",
      "g"
    );

    if (!hasNumber(degree)) {
      if (!re.test(degree)) {
        warnEngNotify();
      } else {
        setDegree(degree);
      }
    } else {
      warnNumberNotify();
    }
  };
  const gradYearChangeHandle = (year) => {
    let isnum = /^\d+$/.test(year);
    if (isnum) {
      if (year.length <= 10) {
        setGradYear(year);
      }
    } else {
      warnTextNotify();
    }
  };
  const univChangeHandle = (univ) => {
    var re = new RegExp(
      "^([A-Z]|[a-z]|[0-9]|[/]|[\\]|[ ]|[]|[\n]|[.]&[?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????])+$",
      "g"
    );

    if (!hasNumber(univ)) {
      if (!re.test(univ)) {
        warnEngNotify();
      } else {
        setUniv(univ);
      }
    } else {
      warnNumberNotify();
    }
  };
  const hasNumber = (mystring) => {
    return /\d/.test(mystring);
  };
  const nameChangeHandle = (currName) => {
    var re = new RegExp(
      "^([A-Z]|[a-z]|[0-9]|[/]|[\\]|[ ]|[]|[\n]|[.]&[?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????])+$",
      "g"
    );
    let splitName = [];
    let firstName = "";
    let lastName = "";
    // if(currName.slice(-1) === ' '){
    //   setCurrName(currName);
    // }
    if (currName === "") {
      setCurrName(currName);
    }
    if (!hasNumber(currName)) {
      if (re.test(currName)) {
        if (hasWhiteSpace(currName)) {
          if (currName.slice(-1) === " ") {
            setCurrName(currName);
          }
          splitName = currName.split(" ");
          firstName = splitName[0];
          lastName = splitName[1];
        }
        if (splitName.length === 1) {
          firstName = currName;
          if (firstName.length > 1) {
            if (firstName.slice(-1).toUpperCase() === firstName.slice(-1)) {
              warnCapitalNotify();
            } else {
              setCurrName(currName);
            }
          } else {
            if (firstName.toUpperCase() === firstName) {
              setCurrName(currName);
            } else {
              warnFirstCapitalNotify();
            }
          }
        } else {
          if (lastName.length > 1) {
            if (lastName.slice(-1).toUpperCase() === lastName.slice(-1)) {
              warnCapitalNotify();
            } else {
              setCurrName(currName);
            }
          } else {
            if (lastName.toUpperCase() === lastName) {
              setCurrName(currName);
            } else {
              warnFirstCapitalNotify();
            }
          }
        }
      } else {
        warnThaiNotify();
      }
    } else {
      warnNumberNotify();
    }
    // console.log('First name: ' + firstName + ' last name: ' + lastName + 'split name size: ' + splitName.length);
  };
  function hasWhiteSpace(s) {
    var reWhiteSpace = new RegExp("/^s+$/");

    // Check for white space
    if (reWhiteSpace.test(s)) {
      //alert("Please Check Your Fields For Spaces");
      return false;
    }

    return true;
  }

  const thaiChangeHandle = (currName) => {
    var re = new RegExp(
      "^([ ]|[?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????])+$",
      "g"
    );
    if (currName === "") {
      setCurrThaiName(currName);
    }
    if (!hasNumber(currName)) {
      if (!re.test(currName)) {
        warnEngNotify();
      } else {
        setCurrThaiName(currName);
      }
    } else {
      warnNumberNotify();
    }
  };

  const positionChangeHandle = (currName) => {
    if (!hasNumber(currName)) {
      setPosition(currName);
    } else {
      warnNumberNotify();
    }
  };

  const expPositionChangeHandle = (currName) => {
    if (!hasNumber(currName)) {
      setExpPosition(currName);
    } else {
      warnNumberNotify();
    }
  };

  const expCompanyChangeHandle = (currName) => {
    if (!hasNumber(currName)) {
      setExpCompany(currName);
    } else {
      warnNumberNotify();
    }
  };

  const responsibilityChangeHandle = (currName) => {
    if (!hasNumber(currName)) {
      setResponsibility(currName);
      setSplitRes(currName.split(","));
    } else {
      warnNumberNotify();
    }
  };

  const expProjectChangeHandle = (currName) => {
    setExpProject(currName);
  };

  const certificateChangeHandle = (currName) => {
    setCertificate(currName);
  };

  const industryChangeHandle = (currName) => {
    if (!hasNumber(currName)) {
      setIndustry(currName);
    } else {
      warnNumberNotify();
    }
  };

  const [skillData, setSkillData] = useState([]);
  const [majorCategory, setMajorCategory] = useState("");
  const [minorCategory, setMinorCategory] = useState("");
  const [totalExps, setTotalExp] = useState("");
  const [relExps, setRelExp] = useState("");
  const [minExps, setMinExp] = useState("");

  const getSkill = async () => {
    try {
      const response = await fetch(
        "https://mongo-cv-api.herokuapp.com/all-skill",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Error! status : ${(response, status)}`);
      }
      const result = await response.json();
      for (let i = 0; i < result.length; i++) {
        skillData[i] = result[i];
      }
    } catch (err) {
      setErr(err.message);
    } finally {
      await console.log(skillData);
    }
  };
  const [majorSkill, setMajorSkill] = useState("");
  const [minorSkill, setMinorSkill] = useState("");
  var os = [];
  var pl = [];
  var db = [];
  var tools = [];
  const [currOS, setCurrOS] = useState("");
  const [currPL, setCurrPL] = useState("");
  const [currDB, setCurrDB] = useState("");
  const [currIDE, setCurrIDE] = useState("");

  var minos = [];
  var minpl = [];
  var mindb = [];
  var mintools = []; //
  const [currMinOS, setCurrMinOS] = useState("");
  const [currMinPL, setCurrMinPL] = useState("");
  const [currMinDB, setCurrMinDB] = useState("");
  const [currMinIDE, setCurrMinIDE] = useState("");

  const handleMajorChange = (e) => {
    var re = new RegExp(
      "^([A-Z]|[a-z]|[0-9]|[/]|[@]|[.]|[,]|[\\]|[+]|[#]|[ ]|[\n]&[?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????])+$",
      "g"
    );
    if (e === "") {
      setMajorSkill(e);
    }
    let skill = e.split(", ");
    let latest = skill[skill.length - 1];
    if (re.test(e)) {
      if (e === "") {
        setMajorSkill(e);
      } else if (e[e.length - 1] === "," || e[e.length - 1] === " ") {
        setMajorSkill(e);
      } else {
        if (latest.length <= 1) {
          console.log("base: " + latest.slice(-1));
          console.log("upper: " + latest.slice(-1).toUpperCase());
          if (latest[0] === latest[0].toUpperCase()) {
            setMajorSkill(e);
          } else {
            warnFirstSkillNotify();
          }
        } else {
          setMajorSkill(e);
        }
      }
    } else {
      warnThaiNotify();
    }
    let cat = [];
    for (let i = 0; i < skill.length; i++) {
      for (let j = 0; j < skillData.length; j++) {
        if (skill[i].toLowerCase() === skillData[j].skill.toLowerCase()) {
          cat[i] = skillData[j].category;
          break;
        } else {
          cat[i] = "Not Found";
        }
      }
    }
    os.length = 0;
    pl.length = 0;
    db.length = 0;
    tools.length = 0;
    for (let i = 0; i < skill.length; i++) {
      if (cat[i] === "Operating System") {
        os.push(skill[i]);
      } else if (cat[i] === "Programming Language") {
        pl.push(skill[i]);
      } else if (cat[i] === "Database") {
        db.push(skill[i]);
      } else if (cat[i] === "Tools and IDE") {
        tools.push(skill[i]);
      }
    }
    setCurrOS(os.join(", "));
    setCurrPL(pl.join(", "));
    setCurrDB(db.join(", "));
    setCurrIDE(tools.join(", "));
    setMajorCategory(cat.join(", "));
  };

  const handleMinorChange = (e) => {
    var re = new RegExp(
      "^([A-Z]|[a-z]|[0-9]|[/]|[@]|[.]|[,]|[\\]|[+]|[#]|[ ]|[\n]&[?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????])+$",
      "g"
    );
    if (e === "") {
      setMinorSkill(e);
    }
    let skill = e.split(", ");
    let latest = skill[skill.length - 1];
    if (re.test(e)) {
      if (e === "") {
        setMinorSkill(e);
      } else if (e[e.length - 1] === "," || e[e.length - 1] === " ") {
        setMinorSkill(e);
      } else {
        if (latest.length <= 1) {
          console.log("base: " + latest.slice(-1));
          console.log("upper: " + latest.slice(-1).toUpperCase());
          if (latest[0] === latest[0].toUpperCase()) {
            setMinorSkill(e);
          } else {
            warnFirstSkillNotify();
          }
        } else {
          setMinorSkill(e);
        }
      }
    } else {
      warnThaiNotify();
    }
    let cat = [];
    for (let i = 0; i < skill.length; i++) {
      for (let j = 0; j < skillData.length; j++) {
        if (skill[i].toLowerCase() === skillData[j].skill.toLowerCase()) {
          cat[i] = skillData[j].category;
          break;
        } else {
          cat[i] = "Not Found";
        }
      }
    }
    minos.length = 0;
    minpl.length = 0;
    mindb.length = 0;
    mintools.length = 0;
    for (let i = 0; i < skill.length; i++) {
      if (cat[i] === "Operating System") {
        minos.push(skill[i]);
      } else if (cat[i] === "Programming Language") {
        minpl.push(skill[i]);
      } else if (cat[i] === "Database") {
        mindb.push(skill[i]);
      } else if (cat[i] === "Tools and IDE") {
        mintools.push(skill[i]);
      }
    }
    setCurrMinOS(minos.join(", "));
    setCurrMinPL(minpl.join(", "));
    setCurrMinDB(mindb.join(", "));
    setCurrMinIDE(mintools.join(", "));
    console.log(cat);
    setMinorCategory(cat.join(", "));
  };
  const [softSkill, setSoftSkill] = useState("");
  const [splitSoft, setSplitSoft] = useState([]);
  const handleSoftChange = (e) => {
    var re = new RegExp(
      "^([A-Z]|[a-z]|[0-9]|[/]|[,]|[@]|[.]|[-]|[\\]|[ ]|[\n]&[?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????])+$",
      "g"
    );
    if (e === "") {
      setSoftSkill(e);
    }
    let skill = e.split(", ");
    let latest = skill[skill.length - 1];

    if (re.test(e)) {
      if (e === "") {
        setSoftSkill(e);
        setSplitSoft(skill);
      } else if (e[e.length - 1] === ",") {
        setSoftSkill(e);
        setSplitSoft(skill);
      } else {
        if (latest.length <= 1) {
          console.log("base: " + latest.slice(-1));
          console.log("upper: " + latest.slice(-1).toUpperCase());
          if (latest[0] === latest[0].toUpperCase()) {
            setSoftSkill(e);
            setSplitSoft(skill);
          } else {
            warnFirstSkillNotify();
          }
        } else {
          setSoftSkill(e);
          setSplitSoft(skill);
        }
      }
    } else {
      warnThaiNotify();
    }
  };

  const handletotalExpChange = async (e) => {
    await setTotalExp(e);
  };

  const handleRelExpChange = async (e) => {
    setRelExp(e);
  };

  const handleMinExpChange = async (e) => {
    setMinExp(e);
  };

  const resetInformation = () => {
    setStatusValue(null);
    setProficientValue(null);
    setLangValue(null);
    setPosition("");
    setCurrName("");
    setCurrThaiName("");
    setGenderValue(null);
    setMaritalValue(null);
    setEmail("");
    setTel("");
    setTotalExp("");
    setCertificate("");
    setWorkList([
      {
        company: "",
        position: "",
        project: "",
        industries: "",
        response: "",
        workStart: "",
        workEnd: "",
      },
    ]);
    setMajorSkill("");
    setRelExp("");
    setMinorSkill("");
    setMinExp("");
    setSoftSkill("");
    setDegree("");
    setGradYear("");
    setUniv("");
    setGPA("");
    resetNotify();
  };

  useEffect(() => {
    getSkill();
    // setDivHeight(ref.current.clientHeight);
    // console.log("height: ", ref.current.clientHeight);
    // console.log("width: ", ref.current.clientWidth);
  }, []);

  const [prescreenDate, setPrescreenDate] = useState(new Date());
  const [interviewDateFrom, setInterviewDateFrom] = useState(new Date());
  const [interviewDateTo, setInterviewDateTo] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [birthDate, setBirthDate] = useState(new Date());
  const [workStart, setWorkStart] = useState(new Date());
  const [workEnd, setWorkEnd] = useState(new Date());
  const [startString, setStartString] = useState("");
  const [endString, setEndString] = useState("");
  const [age, setAge] = useState(null);
  const handleDOB = (date) => {
    setBirthDate(date);
    let year = date.toString();
    let subyear = year.substring(11, 16);
    let numyear = parseInt(subyear);
    setAge(2022 - numyear);
  };
  const workStartChangeHandle = (date) => {
    console.log(date.toString());
    setStartString(
      date.toString().slice(4, 7) + "/" + date.toString().slice(11, 15)
    );
    setWorkStart(date);
  };

  const workEndChangeHandle = (date) => {
    console.log(date.toString());
    setEndString(
      date.toString().slice(4, 7) + "/" + date.toString().slice(11, 15)
    );
    setWorkEnd(date);
  };

  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const handleEmailChange = (email) => {
    var re = new RegExp(
      "^([A-Z]|[a-z]|[0-9]|[/]|[@]|[.]|[\\]|[ ]|[\n]&[?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????])+$",
      "g"
    );
    if (re.test(email)) {
      setEmail(email);
    } else {
      warnThaiNotify();
    }
  };
  const handleTelChange = (tel) => {
    let isnum = /^\d+$/.test(tel);
    if (isnum) {
      if (tel.length <= 10) {
        setTel(tel);
      }
    } else {
      warnTextNotify();
    }
  };
  const emptyField = () => {
    let iswarn = false;
    if (
      position.length <= 0 ||
      currName.length <= 0 ||
      email.length <= 0 ||
      tel.length <= 0 ||
      totalExps.length <= 0 ||
      gpa.length <= 0 ||
      majorSkill.length <= 0 ||
      relExps.length <= 0 ||
      minorSkill.length <= 0 ||
      minExps.length <= 0 ||
      softSkill.length <= 0 ||
      langValue.length <= 0 ||
      proficientValue.length <= 0 ||
      prescreenDate.length <= 0 ||
      interviewDateFrom.length <= 0 ||
      interviewDateTo.length <= 0 ||
      startDate.length <= 0 ||
      statusValue.length <= 0
    ) {
      iswarn = true;
    }
    if (iswarn) {
      warnEmptyNotify();
    }
  };

  const [workList, setWorkList] = useState([
    {
      company: "",
      position: "",
      project: "",
      industries: "",
      response: "",
      workStart: "",
      workEnd: "",
    },
  ]);

  const handleServiceChange = (e, index) => {
    const { name, value } = e.target;

    const list = [...workList];
    list[index][name] = value;
    setWorkList(list);
    var proj = "";
    var inds = "";
    for (let i = 0; i < workList.length; i++) {
      let temp = workList[i].project;
      proj = proj + ", " + temp;
      setExpProject(proj.slice(2, proj.length));
    }
    for (let i = 0; i < workList.length; i++) {
      let temp = workList[i].industries;
      inds = inds + ", " + temp;
      setIndustry(inds.slice(2, inds.length));
    }
  };

  const handleServiceRemove = (index) => {
    const list = [...workList];
    list.splice(index, 1);
    setWorkList(list);
  };

  const handleServiceAdd = () => {
    setWorkList([
      ...workList,
      {
        company: "",
        position: "",
        project: "",
        industries: "",
        response: "",
        workStart: "",
        workEnd: "",
      },
    ]);
  };

  const [logoWidth, setLogoWidth] = useState(100);
  const [logoHeight, setLogoHeight] = useState(100);

  const [interviewNotes, setInterviewNotes] = useState("");

  return (
    <motion.div
      className="newApp-body mt-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
    >
      <Container>
        <Row>
          <Col>
            <Row className="mb-2">
              <h1>New Applicant</h1>
            </Row>

            <Row className="d-flex justify-content-start">
              <Form
                action="https://mongo-cv-api.herokuapp.com/upload"
                method="POST"
                encType="multipart/form-data"
                className="newApp-form"
              >
                <Accordion
                  defaultActiveKey={["0"]}
                  alwaysOpen
                  className="shadow"
                  style={{ borderRadius: "16px" }}
                >
                  {/* POSITION */}
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>
                      <b>Applied for</b>
                    </Accordion.Header>
                    <Accordion.Body>
                      <Form.Group>
                        <FloatingLabel label="Position">
                          <Form.Control
                            placeholder="Position"
                            type="text"
                            id="position"
                            name="position"
                            value={position}
                            onChange={(e) =>
                              positionChangeHandle(e.target.value)
                            }
                            autoComplete="new-password"
                            required
                          />
                        </FloatingLabel>
                      </Form.Group>
                    </Accordion.Body>
                  </Accordion.Item>
                  {/* Personal Details */}
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>
                      <b>Personal Details</b>
                    </Accordion.Header>
                    <Accordion.Body>
                      <Form.Group className="mb-3">
                        <FloatingLabel label="Name">
                          <Form.Control
                            placeholder="Name"
                            type="text"
                            id="name"
                            name="name"
                            value={currName}
                            onChange={(e) => nameChangeHandle(e.target.value)}
                            autoComplete="new-password"
                            required
                          />
                        </FloatingLabel>
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <FloatingLabel label="Thai Name">
                          <Form.Control
                            placeholder="ThaiName"
                            type="text"
                            id="thaiName"
                            name="thaiName"
                            value={currThaiName}
                            onChange={(e) => thaiChangeHandle(e.target.value)}
                            autoComplete="new-password"
                          />
                        </FloatingLabel>
                      </Form.Group>
                      <Row className="mb-3">
                        <Col>
                          <Form.Label htmlFor="gender">Gender</Form.Label>
                          <Select
                            options={genderOptions}
                            name="gender"
                            id="gender"
                            value={genderValue}
                            onChange={genderSelectChange}
                          />
                        </Col>
                        <Col>
                          <Form.Label htmlFor="marital">
                            Marital Status
                          </Form.Label>
                          <Select
                            options={maritalOptions}
                            name="marital"
                            id="marital"
                            value={maritalValue}
                            onChange={maritalSelectChange}
                            required
                          />
                        </Col>
                        <Col>
                          <Form.Label htmlFor="birthDate">
                            Date of Birth
                          </Form.Label>
                          <DatePicker
                            selected={birthDate}
                            dateFormat="dd/MM/yyyy"
                            onChange={(date) => handleDOB(date)}
                            id="birthDate"
                            name="birthDate"
                            maxDate={new Date()}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Form.Group>
                            <FloatingLabel label="Email">
                              <Form.Control
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) =>
                                  handleEmailChange(e.target.value)
                                }
                                autoComplete="new-password"
                                placeholder="email"
                                required
                              />
                            </FloatingLabel>
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group>
                            <FloatingLabel label="Tel.">
                              <Form.Control
                                type="text"
                                id="tel"
                                name="tel"
                                value={tel}
                                onChange={(e) =>
                                  handleTelChange(e.target.value)
                                }
                                autoComplete="new-password"
                                placeholder="year"
                                required
                              />
                            </FloatingLabel>
                          </Form.Group>
                        </Col>
                      </Row>
                    </Accordion.Body>
                  </Accordion.Item>
                  {/* Work Experience */}
                  <Accordion.Item eventKey="2">
                    <Accordion.Header>
                      <b>Work Experiences</b>
                    </Accordion.Header>
                    <Accordion.Body>
                      <Row className="mb-3">
                        <Col>
                          <Form.Group>
                            <FloatingLabel label="Total Experience(yrs.)">
                              <Form.Control
                                type="number"
                                id="exp"
                                name="exp"
                                min={relExps}
                                max={100}
                                step={1}
                                value={totalExps}
                                onChange={(e) =>
                                  handletotalExpChange(e.target.value)
                                }
                                autoComplete="new-password"
                                placeholder="year"
                                required
                              />
                            </FloatingLabel>
                          </Form.Group>
                          <Form.Group className="mt-3">
                            <FloatingLabel label="Certificates or Training">
                              <Form.Control
                                placeholder="Certificates or Training"
                                type="text"
                                id="certificate"
                                name="certificate"
                                value={certificate}
                                onChange={(e) =>
                                  certificateChangeHandle(e.target.value)
                                }
                                autoComplete="new-password"
                              />
                            </FloatingLabel>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        {workList.map((singleService, index) => (
                          <div key={index} className="services py-3 mb-3">
                            <div className="first-division">
                              <Card>
                                <Card.Header>
                                  <Row>
                                    <Col>
                                      <h5>Experience {index + 1}</h5>
                                    </Col>
                                    <Col style={{ textAlign: "right" }}>
                                      {workList.length !== 1 && (
                                        <h5
                                          onClick={() =>
                                            handleServiceRemove(index)
                                          }
                                          className="remove-btn"
                                        >
                                          x
                                        </h5>
                                      )}
                                    </Col>
                                  </Row>
                                </Card.Header>
                                <Card.Body>
                                  <Form.Group className="mb-3">
                                    <FloatingLabel label="Company">
                                      <Form.Control
                                        placeholder="Company"
                                        type="text"
                                        id="company"
                                        name="company"
                                        value={singleService.company}
                                        onChange={(e) =>
                                          handleServiceChange(e, index)
                                        }
                                        autoComplete="new-password"
                                      />
                                    </FloatingLabel>
                                  </Form.Group>
                                  <Form.Group className="mb-3">
                                    <FloatingLabel label="Position">
                                      <Form.Control
                                        placeholder="Experience Position"
                                        type="text"
                                        id="position"
                                        name="position"
                                        value={singleService.position}
                                        onChange={(e) =>
                                          handleServiceChange(e, index)
                                        }
                                        autoComplete="new-password"
                                      />
                                    </FloatingLabel>
                                  </Form.Group>
                                  <Form.Group className="mb-3">
                                    <FloatingLabel label="Project">
                                      <Form.Control
                                        placeholder="Project"
                                        type="text"
                                        id="project"
                                        name="project"
                                        value={singleService.project}
                                        onChange={(e) =>
                                          handleServiceChange(e, index)
                                        }
                                        autoComplete="new-password"
                                      />
                                    </FloatingLabel>
                                  </Form.Group>
                                  <Form.Group className="mb-3">
                                    <FloatingLabel label="Business Industries">
                                      <Form.Control
                                        placeholder="Business Industries"
                                        type="text"
                                        id="industries"
                                        name="industries"
                                        value={singleService.industries}
                                        onChange={(e) =>
                                          handleServiceChange(e, index)
                                        }
                                        autoComplete="new-password"
                                      />
                                    </FloatingLabel>
                                  </Form.Group>
                                  <Form.Group>
                                    <FloatingLabel label="Responsibility">
                                      <Form.Control
                                        placeholder="Responsibility"
                                        type="text"
                                        id="response"
                                        name="response"
                                        value={singleService.response}
                                        onChange={(e) =>
                                          handleServiceChange(e, index)
                                        }
                                        autoComplete="new-password"
                                      />
                                    </FloatingLabel>
                                    <Row className="mt-3">
                                      <Col>
                                        <Form.Label htmlFor="workStart">
                                          From
                                        </Form.Label>
                                        <Form.Group>
                                          <Form.Control
                                            placeholder="Jul/2022"
                                            type="text"
                                            id="workStart"
                                            name="workStart"
                                            value={singleService.workStart}
                                            onChange={(e) =>
                                              handleServiceChange(e, index)
                                            }
                                            autoComplete="new-password"
                                            required
                                          />
                                        </Form.Group>
                                      </Col>
                                      <Col>
                                        <Form.Label htmlFor="workEnd">
                                          To
                                        </Form.Label>
                                        <Form.Group>
                                          <Form.Control
                                            placeholder="Dec/2022"
                                            type="text"
                                            id="workEnd"
                                            name="workEnd"
                                            value={singleService.workEnd}
                                            onChange={(e) =>
                                              handleServiceChange(e, index)
                                            }
                                            autoComplete="new-password"
                                            required
                                          />
                                        </Form.Group>
                                      </Col>
                                    </Row>
                                    <Row
                                      style={{ textAlign: "right" }}
                                      className="mt-3"
                                    >
                                      <Col>
                                        {workList.length - 1 === index &&
                                          workList.length < 4 && (
                                            <button
                                              className="form-control-btn-upload"
                                              onClick={handleServiceAdd}
                                            >
                                              +
                                            </button>
                                          )}
                                      </Col>
                                    </Row>
                                  </Form.Group>
                                </Card.Body>
                              </Card>
                            </div>
                          </div>
                        ))}
                      </Row>
                    </Accordion.Body>
                  </Accordion.Item>
                  {/* Skill */}
                  <Accordion.Item eventKey="3">
                    <Accordion.Header>
                      <b>Skills</b>
                    </Accordion.Header>
                    <Accordion.Body>
                      <Row>
                        <Col>
                          <p>
                            *Add more skill with "," and Skill should start with
                            Capital letter
                          </p>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Form.Group className="mb-3">
                            <FloatingLabel label="Major Skill">
                              <Form.Control
                                type="text"
                                id="majorSkill"
                                name="majorSkill"
                                value={majorSkill}
                                onChange={(e) =>
                                  handleMajorChange(e.target.value)
                                }
                                autoComplete="new-password"
                                placeholder="python"
                                required
                              />
                            </FloatingLabel>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col>
                          <Form.Group>
                            <FloatingLabel label="Category">
                              <Form.Control
                                type="text"
                                id="majorCategory"
                                name="majorCategory"
                                value={majorCategory}
                                readOnly
                                placeholder="python"
                              />
                            </FloatingLabel>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col>
                          <Form.Group>
                            <FloatingLabel label="Total relevant experience(yrs.)">
                              <Form.Control
                                type="number"
                                id="majorExp"
                                name="majorExp"
                                min={0}
                                max={totalExps}
                                step={1}
                                placeholder="3"
                                value={relExps}
                                onChange={(e) =>
                                  handleRelExpChange(e.target.value)
                                }
                                autoComplete="new-password"
                                required
                              />
                            </FloatingLabel>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col>
                          <Form.Group>
                            <FloatingLabel label="Minor Skill">
                              <Form.Control
                                type="text"
                                id="minorSkill"
                                name="minorSkill"
                                value={minorSkill}
                                onChange={(e) =>
                                  handleMinorChange(e.target.value)
                                }
                                placeholder="Minor Skill"
                                autoComplete="new-password"
                                required
                              />
                            </FloatingLabel>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col>
                          <Form.Group>
                            <FloatingLabel label="Category">
                              <Form.Control
                                type="text"
                                id="minorCategory"
                                name="minorCategory"
                                value={minorCategory}
                                readOnly
                                placeholder="python"
                              />
                            </FloatingLabel>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col>
                          <Form.Group>
                            <FloatingLabel label="Total relevant experience(yrs.)">
                              <Form.Control
                                type="number"
                                id="minorExp"
                                name="minorExp"
                                min={0}
                                max={100}
                                step={1}
                                value={minExps}
                                onChange={(e) =>
                                  handleMinExpChange(e.target.value)
                                }
                                placeholder="2"
                                autoComplete="new-password"
                                required
                              />
                            </FloatingLabel>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col>
                          <Form.Group>
                            <FloatingLabel label="Soft Skill">
                              <Form.Control
                                type="text"
                                id="softSkill"
                                name="softSkill"
                                value={softSkill}
                                onChange={(e) =>
                                  handleSoftChange(e.target.value)
                                }
                                placeholder="softskill"
                                autoComplete="new-password"
                                required
                              />
                            </FloatingLabel>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Form.Label htmlFor="langSkill">
                            Language Skill
                          </Form.Label>
                          <Select
                            options={langOptions}
                            name="langSkill"
                            id="langSkill"
                            value={langValue}
                            onChange={langSelectChange}
                            required
                          />
                        </Col>
                        <Col>
                          <Form.Label htmlFor="proficiency">
                            Proficiency
                          </Form.Label>
                          <Select
                            options={proficientOptions}
                            name="proficiency"
                            id="proficiency"
                            value={proficientValue}
                            onChange={profSelectChange}
                            required
                          />
                        </Col>
                      </Row>
                    </Accordion.Body>
                  </Accordion.Item>
                  {/* Education */}
                  <Accordion.Item eventKey="4">
                    <Accordion.Header>
                      <b>Educations</b>
                    </Accordion.Header>
                    <Accordion.Body>
                      <Row>
                        <Col>
                          <Form.Group>
                            <FloatingLabel label="Degree">
                              <Form.Control
                                type="text"
                                id="degree"
                                name="degree"
                                value={degree}
                                onChange={(e) =>
                                  degreeChangeHandle(e.target.value)
                                }
                                autoComplete="new-password"
                                placeholder="degree"
                              />
                            </FloatingLabel>
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group>
                            <FloatingLabel label="Graduate Year">
                              <Form.Control
                                type="text"
                                id="year"
                                name="year"
                                value={gradYear}
                                onChange={(e) =>
                                  gradYearChangeHandle(e.target.value)
                                }
                                autoComplete="new-password"
                                placeholder="degree"
                              />
                            </FloatingLabel>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row className="mt-3">
                        <Col>
                          <Form.Group>
                            <FloatingLabel label="University">
                              <Form.Control
                                type="text"
                                id="univ"
                                name="univ"
                                value={univ}
                                onChange={(e) =>
                                  univChangeHandle(e.target.value)
                                }
                                autoComplete="new-password"
                                placeholder="univ"
                              />
                            </FloatingLabel>
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group>
                            <FloatingLabel label="GPA">
                              <Form.Control
                                type="number"
                                id="gpa"
                                name="gpa"
                                min={0}
                                max={4}
                                step={0.01}
                                value={gpa}
                                onChange={(e) => setGPA(e.target.value)}
                                autoComplete="new-password"
                                placeholder="GPA"
                                required
                              />
                            </FloatingLabel>
                          </Form.Group>
                        </Col>
                      </Row>
                    </Accordion.Body>
                  </Accordion.Item>
                  {/* Applicant Status */}
                  <Accordion.Item eventKey="5">
                    <Accordion.Header>
                      <b>Applicant Status</b>
                    </Accordion.Header>
                    <Accordion.Body>
                      <Row>
                        <Col>
                          <Form.Label htmlFor="prescreenDate">
                            Pre-screen Date
                          </Form.Label>
                          <DatePicker
                            selected={prescreenDate}
                            dateFormat="dd/MM/yyyy"
                            onChange={(date) => setPrescreenDate(date)}
                            id="prescreenDate"
                            name="prescreenDate"
                            maxDate={prescreenDate}
                            required
                          />
                        </Col>
                        <Col>
                          <Form.Label htmlFor="startDate">
                            Availability
                          </Form.Label>
                          <DatePicker
                            selected={startDate}
                            dateFormat="dd/MM/yyyy"
                            onChange={(date) => setStartDate(date)}
                            id="startDate"
                            name="startDate"
                            required
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Form.Label htmlFor="status">Status</Form.Label>
                          <Select
                            options={statusOptions}
                            name="status"
                            id="status"
                            value={statusValue}
                            onChange={statSelectChange}
                            required
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Form.Label htmlFor="interviewDateFrom">
                            Interview From
                          </Form.Label>
                          <DatePicker
                            selected={interviewDateFrom}
                            dateFormat="dd/MM/yyyy"
                            onChange={(date) => setInterviewDateFrom(date)}
                            id="interviewDateFrom"
                            name="interviewDateFrom"
                            minDate={prescreenDate}
                            // maxDate={interviewDateFrom}
                            required
                          />
                        </Col>
                        <Col>
                          <Form.Label htmlFor="interviewDateTo">To</Form.Label>
                          <DatePicker
                            selected={interviewDateTo}
                            onChange={(date) => setInterviewDateTo(date)}
                            dateFormat="dd/MM/yyyy"
                            id="interviewDateTo"
                            name="interviewDateTo"
                            minDate={interviewDateFrom}
                            // maxDate={interviewDateFrom}
                            required
                          />
                        </Col>
                      </Row>
                      <Row className="mt-3">
                        <Row>
                          <Col>
                            <Form.Label htmlFor="interviewNotes">
                              Interview Notes
                            </Form.Label>
                          </Col>
                        </Row>
                        <Col>
                          <Row>
                            <textarea
                              style={{ height: "14vh" }}
                              id="interviewNotes"
                              name="interviewNotes"
                              onChange={(e) =>
                                setInterviewNotes(e.target.value)
                              }
                              value={interviewNotes}
                            ></textarea>
                          </Row>
                        </Col>
                      </Row>
                    </Accordion.Body>
                  </Accordion.Item>
                  {/* Files */}
                  <Accordion.Item eventKey="6">
                    <Accordion.Header>
                      <b>Files</b>
                    </Accordion.Header>
                    <Accordion.Body>
                      <Row className="mb-3">
                        <Col>
                          <Form.Label htmlFor="file">Original CV</Form.Label>
                          <input
                            className="form-control"
                            name="uploadedFile"
                            id="file"
                            type="file"
                            encType="multipart/form-data"
                            accept="application/pdf"
                            // onChange={(e) => orifileChangedHandler(e)}
                            required
                          ></input>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Form.Label htmlFor="file">Generated CV</Form.Label>
                          <input
                            className="form-control"
                            name="uploadedGenCV"
                            id="file"
                            type="file"
                            encType="multipart/form-data"
                            accept="application/pdf"
                            // onChange={(e) => genfileChangedHandler(e)}
                          ></input>
                        </Col>
                      </Row>
                      {/* <Row>
                  <p>Total File size : {totalFileSize} / 50 MB</p>
                </Row> */}
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>

                {/* submit and reset button */}
                <Row className="mb-4 mt-3" style={{ textAlign: "center" }}>
                  <Col>
                    <input
                      className="form-control-btn-main"
                      type="submit"
                      value="Add Applicant"
                      onClick={emptyField}
                    />
                  </Col>
                  <Col>
                    <input
                      className="form-control-btn-main"
                      type="reset"
                      value="Reset information"
                      onClick={resetInformation}
                    ></input>
                  </Col>
                </Row>
              </Form>
            </Row>
          </Col>
          <Col>
            <Row>
              <h1>Preview</h1>
            </Row>
            <Row>
              <Container
                className="shadow mt-2"
                ref={ref}
                id="report"
                style={{ borderRadius: "8px" }}
              >
                <Row
                  className="p-3 mb-2"
                  style={{ borderBottom: "1px solid gray" }}
                >
                  <Col>
                    <Container style={{ padding: "0" }}>
                      <Image
                        className="home-col-icon"
                        src={img}
                        height={logoHeight}
                        width={logoWidth}
                      />
                    </Container>
                  </Col>
                  <Col
                    style={{
                      textAlign: "right",
                      fontStyle: "italic",
                      fontSize: "18pt",
                    }}
                  >
                    <p>{position}</p>
                  </Col>
                </Row>
                <Row style={{ textAlign: "left" }}>
                  <Col>
                    <Row>
                      <h4 style={{ fontSize: "16pt" }}>
                        <b>Personal Details</b>
                      </h4>
                    </Row>
                    <Row style={{ fontSize: "12pt" }}>
                      <Col sm={3}>
                        <p>
                          <b>Name</b>
                        </p>
                        <p>
                          <b>Thai Name</b>
                        </p>
                        <p>
                          <b>Gender</b>
                        </p>
                        <p>
                          <b>Marital Status</b>
                        </p>
                        <p>
                          <b>Age</b>
                        </p>
                      </Col>
                      <Col sm={6}>
                        <p> : {currName}</p>
                        <p> : {currThaiName}</p>
                        <p>
                          {" "}
                          : {genderValue != null && <>{genderValue.value}</>}
                        </p>
                        <p>
                          {" "}
                          : {maritalValue != null && <>{maritalValue.value}</>}
                        </p>
                        <p> : {age != null && <>{age}</>}</p>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row style={{ textAlign: "left" }}>
                  <h4 style={{ fontSize: "16pt" }}>
                    <b>Qualification Summary</b>
                  </h4>
                  <ul style={{ fontSize: "12pt" }}>
                    <li
                      style={{ marginLeft: "1.5rem", wordBreak: "break-all" }}
                    >
                      Overall experience under IT and SDLC for{" "}
                      {<b>{totalExps}</b>} years with the expertise and
                      background experience as {<b>{position}</b>}
                    </li>
                    <li
                      style={{ marginLeft: "1.5rem", wordBreak: "break-all" }}
                    >
                      Solid background and ability to {<b>{expPosition}</b>}{" "}
                      with expertise on {<b>{majorSkill}</b>} and{" "}
                      {<b>{minorSkill}</b>}
                    </li>
                    <li
                      style={{ marginLeft: "1.5rem", wordBreak: "break-all" }}
                    >
                      Proven projects record on {<b>{expProject}</b>} for{" "}
                      {<b>{industry}</b>} Business
                    </li>
                    {certificate.length > 0 && (
                      <li
                        style={{ marginLeft: "1.5rem", wordBreak: "break-all" }}
                      >
                        Certified with {<b>{certificate}</b>}
                      </li>
                    )}
                    {splitSoft.map((skill) => (
                      <li style={{ marginLeft: "1.5rem" }}>{skill}</li>
                    ))}
                    <li style={{ marginLeft: "1.5rem" }}>
                      {proficientValue != null && (
                        <>{<b>{proficientValue.value}</b>}</>
                      )}{" "}
                      at {langValue != null && <>{<b>{langValue.value}</b>}</>}
                    </li>
                  </ul>
                </Row>
                <Row style={{ textAlign: "left" }}>
                  <h4 style={{ fontSize: "16pt" }}>
                    <b>Technical Expertise</b>
                  </h4>
                </Row>
                <Row style={{ fontSize: "12pt" }}>
                  {currOS != "" ||
                    (currMinOS != "" && (
                      <Row>
                        <Col>
                          <ul>
                            <li style={{ marginLeft: "1.5rem" }}>
                              Operating System
                            </li>
                          </ul>
                        </Col>
                        <Col style={{ wordBreak: "break-all" }}>
                          <div>
                            {currOS != "" && currMinOS == "" && (
                              <p> : {currOS}</p>
                            )}
                            {currOS == "" && currMinOS != "" && (
                              <p> : {currMinOS}</p>
                            )}
                            {currOS != "" && currMinOS != "" && (
                              <p>
                                {" "}
                                : {currOS} and {currMinOS}
                              </p>
                            )}
                          </div>
                        </Col>
                      </Row>
                    ))}
                  {(currPL != "" || currMinPL != "") && (
                    <Row>
                      <Col>
                        <ul>
                          <li style={{ marginLeft: "1.5rem" }}>
                            Programming Language
                          </li>
                        </ul>
                      </Col>
                      <Col style={{ wordBreak: "break-all" }}>
                        <div>
                          {/* <p> : {currPL} and {currMinPL}</p> */}
                          {currPL != "" && currMinPL == "" && (
                            <p> : {currPL}</p>
                          )}
                          {currPL == "" && currMinPL != "" && (
                            <p> : {currMinPL}</p>
                          )}
                          {currPL != "" && currMinPL != "" && (
                            <p>
                              {" "}
                              : {currPL} and {currMinPL}
                            </p>
                          )}
                        </div>
                      </Col>
                    </Row>
                  )}
                  {currDB != "" ||
                    (currMinDB != "" && (
                      <Row>
                        <Col>
                          <ul>
                            <li style={{ marginLeft: "1.5rem" }}>Database</li>
                          </ul>
                        </Col>
                        <Col style={{ wordBreak: "break-all" }}>
                          <div>
                            {/* <p> : {currDB} and {currMinDB}</p> */}
                            {currDB != "" && currMinDB == "" && (
                              <p> : {currDB}</p>
                            )}
                            {currDB == "" && currMinDB != "" && (
                              <p> : {currMinDB}</p>
                            )}
                            {currDB != "" && currMinDB != "" && (
                              <p>
                                {" "}
                                : {currDB} and {currMinDB}
                              </p>
                            )}
                          </div>
                        </Col>
                      </Row>
                    ))}
                  {currIDE != "" ||
                    (currMinIDE != "" && (
                      <Row>
                        <Col>
                          <ul>
                            <li style={{ marginLeft: "1.5rem" }}>
                              Tools and IDE
                            </li>
                          </ul>
                        </Col>
                        <Col style={{ wordBreak: "break-all" }}>
                          <div>
                            {/* <p> : {currIDE} and {currMinIDE}</p> */}
                            {currIDE != "" && currMinIDE == "" && (
                              <p> : {currIDE}</p>
                            )}
                            {currIDE == "" && currMinIDE != "" && (
                              <p> : {currMinIDE}</p>
                            )}
                            {currIDE != "" && currMinIDE != "" && (
                              <p>
                                {" "}
                                : {currIDE} and {currMinIDE}
                              </p>
                            )}
                          </div>
                        </Col>
                      </Row>
                    ))}
                </Row>
                <Row style={{ textAlign: "left" }}>
                  <h4 style={{ fontSize: "16pt" }}>
                    <b>Professional Experiences</b>
                  </h4>
                </Row>
                {workList &&
                  workList.map((work, index) => (
                    <Row style={{ fontSize: "12pt" }}>
                      <Row>
                        <Col sm={8}>
                          <b>
                            {work.company.slice(0, 28)} | {work.workStart} -{" "}
                            {work.workEnd}{" "}
                          </b>
                        </Col>
                        <Col sm={4} style={{ textAlign: "right" }}>
                          <b>{work.position}</b>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <b>Projects : </b>
                          {work.project}
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <b>Responsibility : </b>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <ul>
                            {work.response.split(",").map((res) => (
                              <li>{res}</li>
                            ))}
                          </ul>
                        </Col>
                      </Row>
                    </Row>
                  ))}
                <Row style={{ textAlign: "left" }}>
                  <h4 style={{ fontSize: "16pt" }}>
                    <b>Education</b>
                  </h4>
                </Row>
                <Row className="mb-3" style={{ fontSize: "12pt" }}>
                  {(degree != "" || gradYear != "") && (
                    <Row>
                      <Col>{degree}</Col>
                      <Col style={{ textAlign: "right" }}>{gradYear}</Col>
                    </Row>
                  )}
                  {(univ != "" || gpa != "") && (
                    <Row>
                      <Col>{univ}</Col>
                      <Col style={{ textAlign: "right" }}>{gpa}</Col>
                    </Row>
                  )}
                </Row>
              </Container>
            </Row>
            <Row className="mt-3 mb-3">
              <Col>
                <h5>
                  <b>Change logo</b>
                </h5>
                <input
                  type="file"
                  className="form-control"
                  onChange={onImageChange}
                ></input>
              </Col>
            </Row>
            <Row className="mt-3 mb-3">
              <Col>
                <Row>
                  <h5>
                    <b>
                      Logo Width
                    </b>
                  </h5>
                </Row>
                <Row>
                <Col>
                <input
                  type="number"
                  className="form-control"
                  value={logoWidth}
                  min={0}
                  step={1}
                  onChange={(e) => setLogoWidth(e.target.value)}
                ></input>
                </Col>
                </Row>
              </Col>
              <Col>
                <Row>
                  <h5>
                    <b>
                      Logo Height
                    </b>
                  </h5>
                </Row>
                <Row>
                  <Col>
                  <input
                  type="number"
                  className="form-control"
                  value={logoHeight}
                  min={0}
                  step={1}
                  onChange={(e) => setLogoHeight(e.target.value)}
                ></input>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row style={{ textAlign: "center" }}>
              <button
                className="form-control-btn-upload"
                onClick={generatePDF}
                type="button"
              >
                Download PDF
              </button>
            </Row>
          </Col>
        </Row>
        <BackToTopBtn />
        <ToastContainer />
      </Container>
    </motion.div>
  );
};
