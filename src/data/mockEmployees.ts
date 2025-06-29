export interface Employee {
  id: string | number;
  name: string;
  role: string;
  department: string;
  phone: string;
  email: string;
  photo: string;
  address: string;
  status: string;
  attendance: string;
  joinDate: string;
  salary: number;
}

export const mockEmployees: Employee[] = [
  { id: 'ZEN01', name: 'Accounts Zennara', role: 'Accountant', department: 'Accounts', phone: '7070 701 088', email: 'accounts@zennara.com', photo: '', address: 'Jubilee Hills, Hyderabad', status: 'Active', attendance: 'Present', joinDate: '2023-01-01', salary: 0 },
  { id: 11, name: 'Dr Shilpa Gill', role: 'Doctor', department: 'Doctor', phone: '97 11 770077', email: 'shilpa.gill@zennara.com', photo: '', address: 'Jubilee Hills, Hyderabad', status: 'Active', attendance: 'Present', joinDate: '2023-01-01', salary: 0 },
  { id: 17, name: 'Adhip Iyer', role: 'Owner', department: 'Owner', phone: '93 24 184123', email: 'adhip.iyer@zennara.com', photo: '', address: 'Jubilee Hills, Hyderabad', status: 'Active', attendance: 'Present', joinDate: '2022-01-01', salary: 0 },
  { id: 18, name: 'Priyanka Reddy', role: 'Owner', department: 'Owner', phone: '98 49 099634', email: 'priyanka.reddy@zennara.com', photo: '', address: 'Jubilee Hills, Hyderabad', status: 'Active', attendance: 'Present', joinDate: '2022-01-01', salary: 0 },
  { id: 21, name: 'Rashi Chowdary', role: 'Beautician', department: 'Beautician', phone: '7779 998 880', email: 'rashi.chowdary@zennara.com', photo: '', address: 'Jubilee Hills, Hyderabad', status: 'Active', attendance: 'Present', joinDate: '2023-02-01', salary: 0 },
  { id: 22, name: 'Dr Rickson Pereira', role: 'Doctor', department: 'Doctor', phone: '98 33 183554', email: 'rickson.pereira@zennara.com', photo: '', address: 'Jubilee Hills, Hyderabad', status: 'Active', attendance: 'Present', joinDate: '2023-02-15', salary: 0 },
  { id: 23, name: 'Gokul', role: 'Owner', department: 'Owner', phone: '77 99 811311', email: 'gokul@zennara.com', photo: '', address: 'Jubilee Hills, Hyderabad', status: 'Active', attendance: 'Present', joinDate: '2022-03-01', salary: 0 },
  { id: 25, name: 'Dr Varsha Reddy', role: 'Doctor', department: 'Doctor', phone: '89 39 428867', email: 'varsha.reddy@zennara.com', photo: '', address: 'Jubilee Hills, Hyderabad', status: 'Active', attendance: 'Present', joinDate: '2023-03-10', salary: 0 },
  { id: 26, name: 'The Tooth Company', role: 'Doctor', department: 'Doctor', phone: '733 081 3013', email: 'tooth.company@zennara.com', photo: '', address: 'Jubilee Hills, Hyderabad', status: 'Active', attendance: 'Present', joinDate: '2023-03-15', salary: 0 },
  { id: 27, name: 'Swapna Katkuri', role: 'Therapist', department: 'Therapist', phone: '81 06 523566', email: 'swapna.katkuri@zennara.com', photo: '', address: 'Jubilee Hills, Hyderabad', status: 'Active', attendance: 'Present', joinDate: '2023-04-01', salary: 0 },
  // TODO: append remaining rows
];

export const departmentOptions = [
  'All',
  'Doctor',
  'Beautician',
  'Therapist',
  'Clinic Manager',
  'Receptionist',
  'Manager',
  'Accountant',
  'Owner',
  'Wellness Director',
  'Accounts',
];
