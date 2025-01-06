import React from "react";
import {
  Card,
  CardBody,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Spinner,
} from "reactstrap";
import SimpleBar from "simplebar-react";
import { useGetAuditLogsQuery } from "../../redux/features/AuditLogs/auditLogApi";

const AuditLogs = () => {
  const { data: logs = [], isLoading, isError } = useGetAuditLogsQuery();
  const [filter, setFilter] = React.useState("Recent"); // For dropdown filtering

  // Format the timestamp for display
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString(); // E.g., "1/6/2025, 2:34 PM"
  };

  return (
    <Card>
      <CardBody>
        <div className="float-end">
          <UncontrolledDropdown>
            <DropdownToggle tag="a" className="text-reset" caret>
              <span className="text-muted">
                {filter} <i className="mdi mdi-chevron-down ms-1"></i>
              </span>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-end">
              <DropdownItem onClick={() => setFilter("Recent")}>
                Recent
              </DropdownItem>
              <DropdownItem onClick={() => setFilter("By Users")}>
                By Users
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>

        <h4 className="card-title mb-4">Audit Logs</h4>

        {isLoading ? (
          <div className="text-center">
            <Spinner />
          </div>
        ) : isError ? (
          <div className="text-center text-danger">
            <p>Failed to load audit logs. Please try again later.</p>
          </div>
        ) : logs.length > 0 ? (
          <SimpleBar
            className="activity-feed mb-0 ps-2"
            style={{ maxHeight: "336px" }}
          >
            {logs.map((log) => (
              <li className="feed-item" key={log._id}>
                <div className="feed-item-list">
                  <p className="text-muted mb-1 font-size-13">
                    {formatTimestamp(log.timestamp)}
                  </p>
                  <p className="mt-0 mb-0">
                    <strong>{log.action}</strong> action on{" "}
                    <span className="text-primary">{log.resource}</span>
                    {log.resourceId && ` (ID: ${log.resourceId})`} by{" "}
                    <strong>
                      {log.user?.name || "Anonymous"}{" "}
                      {log.user?.email && `(${log.user.email})`}
                    </strong>
                  </p>
                </div>
              </li>
            ))}
          </SimpleBar>
        ) : (
          <p className="text-center text-muted">No audit logs available.</p>
        )}
      </CardBody>
    </Card>
  );
};

export default AuditLogs;
