import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";

const FormTimeLine = ({ progress }) => (
  <Timeline position="alternate">
    {progress.length > 0 &&
      progress?.map((pg, index) => {
        let pgDate = new Date(pg.lodgeDate);
        return (
          <TimelineItem key={`ApplyForm-TimelineItem-${index}`}>
            <TimelineOppositeContent color={"text.secondary"}>
              {`${pgDate.toLocaleTimeString()} ${pgDate.toDateString()}`}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="secondary" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent color="secondary.light">
              {pg.applicationStatus}
            </TimelineContent>
          </TimelineItem>
        );
      })}
  </Timeline>
);
export default FormTimeLine;
