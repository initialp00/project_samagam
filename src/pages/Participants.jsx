// import React from 'react';
// import { GridComponent, Inject, ColumnsDirective, ColumnDirective, Search, Page } from '@syncfusion/ej2-react-grids';

// import { employeesData, employeesGrid } from '../data/dummy';
// import { Header } from '../components';

// const Participants = () => {
//   const toolbarOptions = ['Search'];

//   const editing = { allowDeleting: true, allowEditing: true };

//   return (
//     <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
//       <Header category="Page" title="Participants" />
//       <GridComponent
//         dataSource={employeesData}
//         width="auto"
//         allowPaging
//         allowSorting
//         pageSettings={{ pageCount: 5 }}
//         editSettings={editing}
//         toolbar={toolbarOptions}
//       >
//         <ColumnsDirective>
//           {/* eslint-disable-next-line react/jsx-props-no-spreading */}
//           {employeesGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
//         </ColumnsDirective>
//         <Inject services={[Search, Page]} />

//       </GridComponent>
//     </div>
//   );
// };
// export default Participants;

import React, { useState } from 'react';
import {
  GridComponent,
  Inject,
  ColumnsDirective,
  ColumnDirective,
  Search,
  Page,
} from '@syncfusion/ej2-react-grids';
import { employeesData, employeesGrid } from '../data/dummy';
import { Header } from '../components';
import { GridComponents, Selection, Edit, Toolbar, Sort, Filter } from '@syncfusion/ej2-react-grids';


const Participants = () => {
  const initialFilters = {
    categories: [],
    emirates: [],
    genders: [],
    area: '',
    nationality: '',
    department: '',
  };

  const [filters, setFilters] = useState({ ...initialFilters });
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [importedData, setImportedData] = useState('');

  const selectionsettings = { persistSelecton : true};
  const toolbarOptions = ['Delete'];
  const editing = { allowDeleting: true, allowEditing: true};

  const handleCheckboxChange = (category, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [category]: prevFilters[category].includes(value)
        ? prevFilters[category].filter((item) => item !== value)
        : [...prevFilters[category], value],
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const filteredData = employeesData.filter((employee) => {
      return (
        (filters.categories.length === 0 || filters.categories.includes(employee.category)) &&
        (filters.emirates.length === 0 || filters.emirates.includes(employee.emirates)) &&
        (filters.genders.length === 0 || filters.genders.includes(employee.gender)) &&
        (filters.area === '' || employee.area.includes(filters.area)) &&
        (filters.nationality === '' || employee.nationality.includes(filters.nationality)) &&
        (filters.department === '' || employee.department.includes(filters.department))
      );
    });

    setFilteredEmployees(filteredData);
  };

  const handleClearFilters = () => {
    setFilters({ ...initialFilters });
    setFilteredEmployees([]);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setImportedData(e.target.result);
    };
    reader.readAsText(file);
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-orange-300 rounded-3xl">
      <Header category="Page" title="Participants" />

      {/* Filters Form */}
      <form onSubmit={handleFormSubmit} className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-orange-300 rounded-3xl">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {/* Categories */}
          <label>
            Categories:
            {/* ... */}
            <div>
              {['Karyakar', 'Haribhakt', 'Volunteer', 'Gunbhavi'].map((category) => (
                <label key={category} style={{ marginRight: '10px' }}>
                  <input
                    type="checkbox"
                    name="categories"
                    value={category}
                    checked={filters.categories.includes(category)}
                    onChange={() => handleCheckboxChange('categories', category)}
                  />
                  {category}
                </label>
              ))}
            </div>
          </label>

          {/* Emirates */}
          <label>
            Emirates:
            {/* ... */}
            <div>
              {['Abu Dhabi', 'Dubai', 'Sharjah', 'Ajman', 'Umm Al Quwain', 'Ras Al Khaimah', 'Fujairah'].map((emirate) => (
                <label key={emirate} style={{ marginRight: '10px' }}>
                  <input
                    type="checkbox"
                    name="emirates"
                    value={emirate}
                    checked={filters.emirates.includes(emirate)}
                    onChange={() => handleCheckboxChange('emirates', emirate)}
                  />
                  {emirate}
                </label>
              ))}
            </div>
          </label>

          {/* Genders */}
          <label>
            Genders:
            {/* ... */}
            <div>
              {['Male', 'Female'].map((gender) => (
                <label key={gender} style={{ marginRight: '10px' }}>
                  <input
                    type="checkbox"
                    name="genders"
                    value={gender}
                    checked={filters.genders.includes(gender)}
                    onChange={() => handleCheckboxChange('genders', gender)}
                  />
                  {gender}
                </label>
              ))}
            </div>
          </label>

          {/* Area */}
          <label style={{ display: 'flex', alignItems: 'center' }}>
            Area:
            {/* ... */}
            <input type="text" name="area" value={filters.area} onChange={handleInputChange} style={{ marginLeft: '10px', padding: '5px' }} />
          </label>

          {/* Nationality */}
          <label style={{ display: 'flex', alignItems: 'center' }}>
            Nationality:
            {/* ... */}
            <input type="text" name="nationality" value={filters.nationality} onChange={handleInputChange} style={{ marginLeft: '10px', padding: '5px' }} />
          </label>

          {/* Department */}
          <label style={{ display: 'flex', alignItems: 'center' }}>
            Department:
            {/* ... */}
            <input type="text" name="department" value={filters.department} onChange={handleInputChange} style={{ marginLeft: '10px', padding: '5px' }} />
          </label>

          {/* File Import */}
          <label style={{ display: 'block', marginTop: '20px' }}>
            Import CSV File:
            {/* ... */}
            <input type="file" accept=".csv" onChange={handleFileUpload} style={{ marginLeft: '10px' }} />
          </label>
        </div>

        {/* Buttons */}
        {/* ... */}
        <button type="button" onClick={handleClearFilters} style={{ padding: '8px 16px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', marginBottom: '10px' }}>Clear</button>
        <button type="submit" style={{ padding: '8px 16px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Submit</button>
      
        
      </form>

      {/* Grid Component */}
      <GridComponent
        dataSource={filteredEmployees.length > 0 ? filteredEmployees : employeesData}
        enableHover = {false}
        width="auto"
        allowPaging
        pageSettings={{ pageCount: 5 }}
        selectionSettings = {selectionsettings}
        toolbar = {toolbarOptions}
        editSettings={editing}
        allowSorting
      >
        <ColumnsDirective>
          {employeesGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Search, Page, Selection, Toolbar, Edit, Sort, Filter]} />
      </GridComponent>
    </div>
  );
};

export default Participants;

