import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Card from '@/components/ui/Card'

export default function listaBarcos() {
    return (
        <View>
            <Text>listaBarcos</Text>
            <Card title={'card'} description={'descricao teste'} />
            <Card title={'card'} description={'descricao teste'} />

            <Card title={'card'} description={'descricao teste'} />

            <Card title={'card'} description={'descricao teste'} />

            <Card title={'card'} description={'descricao teste'} />

        </View>
    )
}

const styles = StyleSheet.create({})