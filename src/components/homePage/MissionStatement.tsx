import { Container, Card, CardContent, Typography } from "@mui/material";
import styles from "./missionStatement.module.scss";

const MissionStatement: React.FC = () => {
  return (
    <Container>
      <Card className={styles.missionCard}>
        <CardContent>
          <Typography
            variant="h4"
            component="h2"
            className={styles.missionTitle}
          >
            Our Mission
          </Typography>
          <Typography variant="body1" className={styles.missionText}>
            TestScoreHero is dedicated to bridging the education gap by providing
            personalized and accessible test preparation solutions. Using
            cutting-edge AI, we help students tackle their weaknesses and build
            confidence for exams like the SAT and ACT.
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default MissionStatement;
