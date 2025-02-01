export const COLORS = {
  primary: "#F76C5E",
  secondary: "#6EC6CA",
  background: "#F9F9F9",
  textDark: "#333333",
  textLight: "#FFFFFF",
};

export const STYLES = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
    padding: 20,
  },
  card: {
    width: "90%",
    backgroundColor: COLORS.textLight,
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  input: {
    width: "100%",
    backgroundColor: COLORS.background,
    marginBottom: 10,
  },
  button: {
    width: "100%",
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
  },
  buttonText: {
    color: COLORS.textLight,
    fontSize: 16,
    fontWeight: "bold",
  },
};
