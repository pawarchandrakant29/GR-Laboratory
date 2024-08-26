import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

const statesAndCities = {
  "Andhra Pradesh": [
    "Adoni",
    "Amaravati",
    "Anantapur",
    "Chandragiri",
    "Chittoor",
    "Dowlaiswaram",
    "Eluru",
    "Guntur",
    "Kadapa",
    "Kakinada",
    "Kurnool",
    "Machilipatnam",
    "Nagarjunakoṇḍa",
    "Rajahmundry",
    "Srikakulam",
    "Tirupati",
    "Vijayawada",
    "Visakhapatnam",
    "Vizianagaram",
    "Yemmiganur",
  ],
  "Arunachal Pradesh": ["Itanagar"],
  Assam: [
    "Dhuburi",
    "Dibrugarh",
    "Dispur",
    "Guwahati",
    "Jorhat",
    "Nagaon",
    "Sivasagar",
    "Silchar",
    "Tezpur",
    "Tinsukia",
  ],
  Bihar: [
    "Ara",
    "Barauni",
    "Begusarai",
    "Bettiah",
    "Bhagalpur",
    "Bihar Sharif",
    "Bodh Gaya",
    "Buxar",
    "Chapra",
    "Darbhanga",
    "Dehri",
    "Dinapur Nizamat",
    "Gaya",
    "Hajipur",
    "Jamalpur",
    "Katihar",
    "Madhubani",
    "Motihari",
    "Munger",
    "Muzaffarpur",
    "Patna",
    "Purnia",
    "Pusa",
    "Saharsa",
    "Samastipur",
    "Sasaram",
    "Sitamarhi",
    "Siwan",
  ],
  Chandigarh: ["Chandigarh"],
  Chhattisgarh: [
    "Ambikapur",
    "Bhilai",
    "Bilaspur",
    "Dhamtari",
    "Durg",
    "Jagdalpur",
    "Raipur",
    "Rajnandgaon",
  ],
  "Dadra and Nagar Haveli and Daman and Diu": ["Silvassa", "Daman", "Diu"],
  Delhi: ["Delhi", "New Delhi"],
  Goa: ["Madgaon", "Panaji"],
  Gujarat: [
    "Ahmedabad",
    "Amreli",
    "Bharuch",
    "Bhavnagar",
    "Bhuj",
    "Dwarka",
    "Gandhinagar",
    "Godhra",
    "Jamnagar",
    "Junagadh",
    "Kandla",
    "Khambhat",
    "Kheda",
    "Mahesana",
    "Morbi",
    "Nadiad",
    "Navsari",
    "Okha",
    "Palanpur",
    "Patan",
    "Porbandar",
    "Rajkot",
    "Surat",
    "Surendranagar",
    "Valsad",
    "Veraval",
  ],
  Haryana: [
    "Ambala",
    "Bhiwani",
    "Chandigarh",
    "Faridabad",
    "Firozpur Jhirka",
    "Gurugram",
    "Hansi",
    "Hisar",
    "Jind",
    "Kaithal",
    "Karnal",
    "Kurukshetra",
    "Panipat",
    "Pehowa",
    "Rewari",
    "Rohtak",
    "Sirsa",
    "Sonipat",
  ],
  "Himachal Pradesh": [
    "Bilaspur",
    "Chamba",
    "Dalhousie",
    "Dharmshala",
    "Hamirpur",
    "Kangra",
    "Kullu",
    "Mandi",
    "Nahan",
    "Shimla",
    "Una",
  ],
  "Jammu and Kashmir": [
    "Anantnag",
    "Baramula",
    "Doda",
    "Gulmarg",
    "Jammu",
    "Kathua",
    "Punch",
    "Rajouri",
    "Srinagar",
    "Udhampur",
  ],
  Jharkhand: [
    "Bokaro",
    "Chaibasa",
    "Deoghar",
    "Dhanbad",
    "Dumka",
    "Giridih",
    "Hazaribag",
    "Jamshedpur",
    "Jharia",
    "Rajmahal",
    "Ranchi",
    "Saraikela",
  ],
  Karnataka: [
    "Badami",
    "Ballari",
    "Bengaluru",
    "Belagavi",
    "Bhadravati",
    "Bidar",
    "Chikkamagaluru",
    "Chitradurga",
    "Davangere",
    "Halebid",
    "Hassan",
    "Hubballi-Dharwad",
    "Kalaburagi",
    "Kolar",
    "Madikeri",
    "Mandya",
    "Mangaluru",
    "Mysuru",
    "Raichur",
    "Shivamogga",
    "Shravanabelagola",
    "Shrirangapattana",
    "Tumakuru",
    "Vijayapura",
  ],
  Kerala: [
    "Alappuzha",
    "Vatakara",
    "Idukki",
    "Kannur",
    "Kochi",
    "Kollam",
    "Kottayam",
    "Kozhikode",
    "Mattancheri",
    "Palakkad",
    "Thalassery",
    "Thiruvananthapuram",
    "Thrissur",
  ],
  Ladakh: ["Kargil", "Leh"],
  "Madhya Pradesh": [
    "Balaghat",
    "Barwani",
    "Betul",
    "Bharhut",
    "Bhind",
    "Bhojpur",
    "Bhopal",
    "Burhanpur",
    "Chhatarpur",
    "Chhindwara",
    "Damoh",
    "Datia",
    "Dewas",
    "Dhar",
    "Dr. Ambedkar Nagar (Mhow)",
    "Guna",
    "Gwalior",
    "Hoshangabad",
    "Indore",
    "Itarsi",
    "Jabalpur",
    "Jhabua",
    "Khajuraho",
    "Khandwa",
    "Khargone",
    "Maheshwar",
    "Mandla",
    "Mandsaur",
    "Morena",
    "Murwara",
    "Narsimhapur",
    "Narsinghgarh",
    "Narwar",
    "Neemuch",
    "Nowgong",
    "Orchha",
    "Panna",
    "Raisen",
    "Rajgarh",
    "Ratlam",
    "Rewa",
    "Sagar",
    "Sarangpur",
    "Satna",
    "Sehore",
    "Seoni",
    "Shahdol",
    "Shajapur",
    "Sheopur",
    "Shivpuri",
    "Ujjain",
    "Vidisha",
  ],
  Maharashtra: [
    "Ahmadnagar",
    "Akola",
    "Amravati",
    "Aurangabad",
    "Bhandara",
    "Bhusawal",
    "Bid",
    "Buldhana",
    "Chandrapur",
    "Daulatabad",
    "Dhule",
    "Jalgaon",
    "Kalyan",
    "Karli",
    "Kolhapur",
    "Mahabaleshwar",
    "Malegaon",
    "Matheran",
    "Mumbai",
    "Nagpur",
    "Nanded",
    "Nashik",
    "Osmanabad",
    "Pandharpur",
    "Parbhani",
    "Pune",
    "Ratnagiri",
    "Sangli",
    "Satara",
    "Sevagram",
    "Solapur",
    "Thane",
    "Ulhasnagar",
    "Vasai-Virar",
    "Wardha",
    "Yavatmal",
  ],
  Manipur: ["Imphal"],
  Meghalaya: ["Cherrapunji", "Shillong"],
  Mizoram: ["Aizawl", "Lunglei"],
  Nagaland: ["Kohima", "Mon", "Phek", "Wokha", "Zunheboto"],
  Odisha: [
    "Balangir",
    "Baleshwar",
    "Baripada",
    "Bhubaneshwar",
    "Brahmapur",
    "Cuttack",
    "Dhenkanal",
    "Kendujhar",
    "Konark",
    "Koraput",
    "Paradip",
    "Phulabani",
    "Puri",
    "Sambalpur",
    "Udayagiri",
  ],
  Puducherry: ["Karaikal", "Mahe", "Puducherry", "Yanam"],
  Punjab: [
    "Amritsar",
    "Batala",
    "Chandigarh",
    "Faridkot",
    "Firozpur",
    "Gurdaspur",
    "Hoshiarpur",
    "Jalandhar",
    "Kapurthala",
    "Ludhiana",
    "Nabha",
    "Patiala",
    "Rupnagar",
    "Sangrur",
  ],
  Rajasthan: [
    "Abu",
    "Ajmer",
    "Alwar",
    "Amer",
    "Barmer",
    "Beawar",
    "Bharatpur",
    "Bhilwara",
    "Bikaner",
    "Bundi",
    "Chittaurgarh",
    "Churu",
    "Dhaulpur",
    "Dungarpur",
    "Ganganagar",
    "Hanumangarh",
    "Jaipur",
    "Jaisalmer",
    "Jalor",
    "Jhalawar",
    "Jhunjhunu",
    "Jodhpur",
    "Kishangarh",
    "Kota",
    "Merta",
    "Nagaur",
    "Nathdwara",
    "Pali",
    "Phalodi",
    "Pushkar",
    "Sawai Madhopur",
    "Shahpura",
    "Sikar",
    "Sirohi",
    "Tonk",
    "Udaipur",
  ],
  Sikkim: ["Gangtok", "Gyalshing", "Lachung", "Mangan"],
  "Tamil Nadu": [
    "Arcot",
    "Chengalpattu",
    "Chennai",
    "Chidambaram",
    "Coimbatore",
    "Cuddalore",
    "Dharmapuri",
    "Dindigul",
    "Erode",
    "Kanchipuram",
    "Kanniyakumari",
    "Kodaikanal",
    "Kumbakonam",
    "Madurai",
    "Mamallapuram",
    "Nagappattinam",
    "Nagercoil",
    "Palayamkottai",
    "Pudukkottai",
    "Rajapalayam",
    "Ramanathapuram",
    "Salem",
    "Thanjavur",
    "Tiruchchirappalli",
    "Tirunelveli",
    "Tiruppur",
    "Thoothukudi",
    "Udhagamandalam",
    "Vellore",
  ],
  Telangana: [
    "Hyderabad",
    "Karimnagar",
    "Khammam",
    "Mahbubnagar",
    "Nizamabad",
    "Sangareddi",
    "Warangal",
  ],
  Tripura: ["Agartala"],
  "Uttar Pradesh": [
    "Agra",
    "Aligarh",
    "Amroha",
    "Ayodhya",
    "Azamgarh",
    "Bahraich",
    "Ballia",
    "Banda",
    "Bara Banki",
    "Bareilly",
    "Basti",
    "Bijnor",
    "Bithur",
    "Budaun",
    "Bulandshahr",
    "Deoria",
    "Etah",
    "Etawah",
    "Faizabad",
    "Farrukhabad-cum-Fatehgarh",
    "Fatehpur",
    "Fatehpur Sikri",
    "Ghaziabad",
    "Ghazipur",
    "Gonda",
    "Gorakhpur",
    "Hamirpur",
    "Hardoi",
    "Hathras",
    "Jalaun",
    "Jaunpur",
    "Jhansi",
    "Kannauj",
    "Kanpur",
    "Lakhimpur",
    "Lalitpur",
    "Lucknow",
    "Mainpuri",
    "Mathura",
    "Meerut",
    "Mirzapur-Vindhyachal",
    "Moradabad",
    "Muzaffarnagar",
    "Partapgarh",
    "Pilibhit",
    "Prayagraj",
    "Rae Bareli",
    "Rampur",
    "Saharanpur",
    "Sambhal",
    "Shahjahanpur",
    "Sitapur",
    "Sultanpur",
    "Tehri",
    "Varanasi",
  ],
  Uttarakhand: [
    "Almora",
    "Dehra Dun",
    "Haridwar",
    "Mussoorie",
    "Nainital",
    "Pithoragarh",
  ],
  "West Bengal": [
    "Alipore",
    "Alipur Duar",
    "Asansol",
    "Baharampur",
    "Bally",
    "Balurghat",
    "Bankura",
    "Baranagar",
    "Barasat",
    "Barrackpore",
    "Basirhat",
    "Bhatpara",
    "Bishnupur",
    "Budge Budge",
    "Burdwan",
    "Chandernagore",
    "Darjeeling",
    "Diamond Harbour",
    "Dum Dum",
    "Durgapur",
    "Halisahar",
    "Haora",
    "Hugli",
    "Ingraj Bazar",
    "Jalpaiguri",
    "Kalimpong",
    "Kamarhati",
    "Kanchrapara",
    "Kharagpur",
    "Cooch Behar",
    "Kolkata",
    "Krishnanagar",
    "Malda",
    "Midnapore",
    "Murshidabad",
    "Nabadwip",
    "Palashi",
    "Panihati",
    "Purulia",
    "Raiganj",
    "Santipur",
    "Shantiniketan",
    "Shrirampur",
    "Siliguri",
    "Siuri",
    "Tamluk",
    "Titagarh",
  ],
};

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    age: "",
    date: "",
    time: "",
    address: "",
    city: "",
    state: "",
  });
  const navigate = useNavigate();

  const [cities, setCities] = useState([]);

  const hometransfer = (e) => {
    e.preventDefault();
    navigate("/");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "state") {
      setCities(statesAndCities[value] || []);
      setFormData((prevFormData) => ({
        ...prevFormData,
        state: value,
        city: "",
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };
  const getTodayDateString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getOneMonthFromTodayDateString = () => {
    const today = new Date();
    today.setMonth(today.getMonth() + 1);
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "appointments"), formData);
      console.log("Document written with ID: ", docRef.id);

      setFormData({
        name: "",
        phone: "",
        age: "",
        date: "",
        time: "",
        address: "",
        city: "",
        state: "",
      });

      navigate("/", { state: { success: true } });
    } catch (error) {
      console.error("There was an error submitting the form!", error);
    }
  };

  return (
    <div className="formbold-main-wrapper">
      <div className="formbold-form-wrapper">
        <form onSubmit={handleSubmit} className="position-relative">
          <div className="position-absolute end-0">
            <button className="set-6" onClick={hometransfer}>
              ❌
            </button>
          </div>
          <div className="formbold-mb-5">
            <label htmlFor="name" className="formbold-form-label">
              Full Name <span className="required">*</span>
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Full Name"
              className="formbold-form-input"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="formbold-mb-5">
            <label htmlFor="phone" className="formbold-form-label">
              Phone Number <span className="required">*</span>
            </label>
            <div className="phone-input-wrapper">
              <div className="country">
                <img
                  src="../../public/images/flag.png"
                  alt="India Flag"
                  className="india-flag"
                />
                <span className="country-code">+91</span>
              </div>
              <input
                type="text"
                name="phone"
                id="phone"
                placeholder="Enter your phone number"
                className="formbold-form-input phone-input ms-2"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="formbold-mb-5">
            <label htmlFor="age" className="formbold-form-label">
              Age <span className="required">*</span>
            </label>
            <input
              type="text"
              name="age"
              id="age"
              placeholder="Age"
              className="formbold-form-input"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </div>
          <div className="d-flex">
            <div className="formbold-mb-5 w-50 mr-2">
              <label htmlFor="date" className="formbold-form-label">
                Date <span className="required">*</span>
              </label>
              <input
                type="date"
                name="date"
                id="date"
                className="formbold-form-input"
                value={formData.date}
                onChange={handleChange}
                min={getTodayDateString()}
                max={getOneMonthFromTodayDateString()}
                required
              />
            </div>
            <div className="formbold-mb-5 w-50 ml-2 ms-2">
              <label htmlFor="time" className="formbold-form-label">
                Time <span className="required">*</span>
              </label>
              <input
                type="time"
                name="time"
                id="time"
                className="formbold-form-input"
                value={formData.time}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="formbold-mb-5 formbold-pt-3">
            <label className="formbold-form-label formbold-form-label-2">
              Address Details
            </label>
            <div className="flex flex-wrap formbold--px-3">
              <div className="flex flex-wrap formbold--px-3">
                <div className="w-full sm:w-full formbold-px-3">
                  <div className="formbold-mb-5">
                    <label htmlFor="address" className="formbold-form-label">
                      Address <span className="required">*</span>
                    </label>
                    <textarea
                      name="address"
                      id="address"
                      placeholder="Enter address"
                      className="formbold-form-input"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      rows={3}
                    />
                  </div>
                </div>
                <div className="d-flex">
                  <div className="w-full sm:w-half formbold-px-3">
                    <div className="formbold-mb-5">
                      <label htmlFor="city" className="formbold-form-label">
                        City <span className="required">*</span>
                      </label>
                      <select
                        name="city"
                        id="city"
                        className="formbold-form-input"
                        value={formData.city}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select City</option>
                        {cities.map((city) => (
                          <option key={city} value={city}>
                            {city}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="w-full sm:w-half formbold-px-3">
                    <div className="formbold-mb-5">
                      <label htmlFor="state" className="formbold-form-label">
                        State <span className="required">*</span>
                      </label>
                      <select
                        name="state"
                        id="state"
                        className="formbold-form-input"
                        value={formData.state}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select State</option>
                        {Object.keys(statesAndCities).map((state) => (
                          <option key={state} value={state}>
                            {state}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <button type="submit" className="formbold-btn">
              Book Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentForm;
