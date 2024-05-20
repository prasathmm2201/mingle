import { StyleSheet, Text, View } from 'react-native';

export const TopNavBar = () => {
  return (
    <View style={styles?.container}>
      <View style={styles?.flex}>
        <Text style={styles?.name}>Conversations</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  name: {
    fontSize: 28,
    fontFamily: "Poppins-Medium",
    color: "#071741",
    letterSpacing:0
  },
  flex: {
    flexDirection: "row",
    gap: 10,
    display: "flex",
    alignItems: "center"
  }
});
