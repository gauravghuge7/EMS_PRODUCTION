import React from 'react'


function Reply() {
    
    
    const DailyReport = () => {
      const [reports, setReports] = useState([]);
      const [newReport, setNewReport] = useState({ employeeName: '', reportContent: '' });
    
    
      const [textarea,setTextarea] = useState('');
    
      useEffect(() => {
        // Fetch daily reports from an API (placeholder function)
        fetchReports();
      }, []);
    
      const fetchReports = () => {
        // Placeholder data, replace with API call
        const data = [
          { id: 1, date: '2024-06-01', employeeName: 'John Doe', reportContent: 'Completed task A', status: 'Pending',reply:'',showReply:false },
          { id: 2, date: '2024-06-01', employeeName: 'Jane Smith', reportContent: 'Worked on project B', status: 'Pending',reply:'',showReply:false },
          // Add more reports as needed
        ];
        setReports(data);
      };
    
      const markAsReviewed = (id) => {
        setReports(reports.map(report =>
          report.id === id ? { ...report, status: 'Reviewed' } : report
        ));
      };
    
      const deleteReport = (id) => {
        setReports(reports.filter(report => report.id !== id));
      };
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewReport({ ...newReport, [name]: value });
      };
    
      // write the code for reply feture to submit the reply to the report in the list
      // 1. Add a new property 'reply' to the report object
      // 2. Create a text area and a button for the reply feature
      // 3. Add a state to handle the visibility of the reply text area
      // 4. Add a function to handle the submission of the reply
      // 5. Add a button to submit the reply
      // 6. Add a conditional statement to show the reply text area when the button is clicked
      // 7. Update the state of the report object with the reply content
      // 8. Update the UI to display the reply content in the report list
      // 9. Style the reply feature for better user experience
    
    
    
      const storetheReply = (id,reply) => {
        setReports(reports.map((item) => {
          return item.id === id ? {...item, reply:reply,showReply:false}:item;
        }))
      }
      const toggleShowReply = (report) => {
        setReports(reports.map((item) => {
          if (item.id === report.id) {
            return { ...item, showReply: !item.showReply };
          }
          return item;
        }));
      };
    
      const addReport = (e) => {
        e.preventDefault();
        const report = {
          id: reports.length + 1,
          date: new Date().toISOString().split('T')[0],
          employeeName: newReport.employeeName,
          reportContent: newReport.reportContent,
          status: 'Pending'
        };
        setReports([...reports, report]);
        setNewReport({ employeeName: '', reportContent: '' });
      };
    
      return (
        <div className="report-container ">
          <h2>Daily Reports</h2>
          <form onSubmit={addReport}>
            <input
              type="text"
              name="employeeName"
              value={newReport.employeeName}
              onChange={handleInputChange}
              placeholder="Employee Name"
              required
            />
            <textarea
              name="reportContent"
              value={newReport.reportContent}
              onChange={handleInputChange}
              placeholder="Report Content"
              required
            ></textarea>
            <button type="submit">Add Report</button>
          </form>
          <ul>
            {reports.map(report => (
              <li key={report.id} className={report.status.toLowerCase()}>
                <h3>{report.employeeName}</h3>
                <p>{report.reportContent}</p>
                <span>{report.date}</span>
                <div>
                  {report.status === 'Pending' && <button onClick={() => markAsReviewed(report.id)}>Mark as Reviewed</button>}
                  <button onClick={() => deleteReport(report.id)}>Delete</button>
                  <button  
                  onClick={() => toggleShowReply(report)}
                  style={{backgroundColor:'blue'}}>reply</button>
                </div>
                
                <div style={{display:${report.showReply ?'':'none'}}} >
                  <textarea onChange={(e) => setTextarea(e.target.value)} style={{ marginTop: '1rem' }} cols={56} />
                  <button onClick={() => storetheReply(report.id,textarea)}>submit</button>
                </div>
         
                <div style={{ marginTop: '1rem' }} >{report.reply}</div>
    
              </li>
            ))}
          </ul>
        </div>
      );
    };
    
    export default DailyReport;
}

export default Reply
