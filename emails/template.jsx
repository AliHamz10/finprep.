import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

export default function EmailTemplate({
  userName = "",
  type = "budget-alert",
  data = {},
}) {
  if (type === "monthly-report") {
  }
  if (type === "budget-alert") {
    return (
      <Html>
        <Head />
        <Preview>Budget Alert</Preview>
        <Body style={styles.body}>
          <Container style={styles.container}>
            <Heading style={styles.title}>⚠️ Budget Alert</Heading>
            <Text style={styles.greeting}>Dear {userName},</Text>
            <Text style={styles.text}>
              You have utilized{" "}
              <strong>{data?.percentageUsed.toFixed(1)}%</strong> of your
              monthly budget. Please review your spending details below:
            </Text>
            <Section style={styles.statsContainer}>
              <div style={styles.stat}>
                <Text style={styles.statLabel}>💰 Budget Amount</Text>
                <Text style={styles.statValue}>${data?.budgetAmount}</Text>
              </div>
              <div style={styles.stat}>
                <Text style={styles.statLabel}>💸 Spent So Far</Text>
                <Text style={styles.statValue}>${data?.totalExpenses}</Text>
              </div>
              <div style={styles.stat}>
                <Text style={styles.statLabel}>🛡️ Remaining</Text>
                <Text style={styles.statValue}>
                  ${data?.budgetAmount - data?.totalExpenses}
                </Text>
              </div>
            </Section>
            <Text style={styles.footer}>
              Staying within your budget is key to financial health. Keep
              tracking your expenses and make informed decisions.
            </Text>
          </Container>
        </Body>
      </Html>
    );
  }
}

const styles = {
  body: {
    backgroundColor: "#f8f9fa",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: "20px",
  },
  container: {
    backgroundColor: "#ffffff",
    margin: "0 auto",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    maxWidth: "600px",
  },
  title: {
    color: "#d9534f",
    fontSize: "28px",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "20px",
  },
  greeting: {
    color: "#333333",
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "16px",
  },
  text: {
    color: "#555555",
    fontSize: "16px",
    lineHeight: "1.6",
    marginBottom: "20px",
  },
  statsContainer: {
    margin: "20px 0",
    padding: "20px",
    backgroundColor: "#f1f3f5",
    borderRadius: "10px",
    border: "1px solid #e0e0e0",
  },
  stat: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 0",
    borderBottom: "1px solid #e9ecef",
    ":last-child": {
      borderBottom: "none",
    },
  },
  statLabel: {
    color: "#495057",
    fontSize: "15px",
    fontWeight: "500",
  },
  statValue: {
    color: "#212529",
    fontSize: "18px",
    fontWeight: "700",
  },
  footer: {
    color: "#6c757d",
    fontSize: "14px",
    textAlign: "center",
    marginTop: "20px",
    paddingTop: "16px",
    borderTop: "1px solid #e9ecef",
  },
};
