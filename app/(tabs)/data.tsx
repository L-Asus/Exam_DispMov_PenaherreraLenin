import React, { useContext } from 'react'
import { Dimensions, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { PieChart } from 'react-native-chart-kit';

export default function data() {
    
    const chartData = [
        {
            name: "SC Sent",
            amount: 1000,
            color: "#6C63FF",
            legendFontColor: "#3D3E44",
            legendFontSize: 15,
        },
        {
            name: "SC Received",
            amount: 12435,
            color: "#5551A2",
            legendFontColor: "#3D3E44",
            legendFontSize: 15,
        },
    ];
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.chartContainer}>
                <Text style={styles.sectionTitle}>Preferencias Presidenciales</Text>
                <PieChart
                    data={chartData}
                    width={Dimensions.get("window").width - 32}
                    height={220}
                    chartConfig={{
                        backgroundColor: "#FCFCFC", // Replace with your background color
                        backgroundGradientFrom: "#FCFCFC",
                        backgroundGradientTo: "#FCFCFC",
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    }}
                    accessor="amount"
                    backgroundColor="transparent"
                    paddingLeft="15"
                    absolute
                />
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    content: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FCFCFC",
        paddingVertical: 16,
    },
    chartContainer: {
        alignItems: "center",
        marginVertical: 20,
    },
    sectionTitle: {
        color: "#1D191D",
        fontSize: 20,
        fontWeight: "bold",
    },
})