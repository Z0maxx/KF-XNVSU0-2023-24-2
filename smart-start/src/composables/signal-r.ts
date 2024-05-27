import { SignalRModel, SignalRType, TableModel } from "@/types";
import * as signalR from '@microsoft/signalr'

export function useSignalR() {
    const models = {
        idea: 'Idea' as SignalRModel,
        rating: 'Rating' as SignalRModel,
        comment: 'Comment' as SignalRModel,
        siteUser: 'SiteUser' as SignalRModel
    }

    const types = {
        created: 'Created' as SignalRType,
        changed: 'Changed' as SignalRType,
        updated: 'Updated' as SignalRType,
        deleted: 'Deleted' as SignalRType
    }

    const connection = new signalR.HubConnectionBuilder().withUrl('https://localhost:7256/hub').build()

    async function startConnection() {
        await connection.start()
    }

    async function onCRUD<T extends TableModel>(callback: (param: T) => void, model: SignalRModel, type: SignalRType, llp = false) {
        const name = `${model}${type}${llp ? 'LLP' : ''}`
        connection.off(name)
        connection.on(name, callback)
        if (connection.state === signalR.HubConnectionState.Disconnected) await startConnection()
    }

    async function onChanged(callback: (id: string) => void, model: SignalRModel) {
        const name = `${model}LLP${types.changed}`
        connection.off(name)
        connection.on(name, callback)
        if (connection.state === signalR.HubConnectionState.Disconnected) await startConnection()
    }

    async function onCreated<T extends TableModel>(callback: (model: T) => void, model: SignalRModel) {
        onCRUD(callback, model, types.created, false)
    }

    async function onCreatedLLP<T extends TableModel>(callback: (model: T) => void, model: SignalRModel) {
        onCRUD(callback, model, types.created, true)
    }

    async function onUpdated<T extends TableModel>(callback: (model: T) => void, model: SignalRModel) {
        onCRUD(callback, model, types.updated, false)
    }

    async function onUpdatedLLP<T extends TableModel>(callback: (model: T) => void, model: SignalRModel) {
        onCRUD(callback, model, types.updated, true)
    }

    async function onDeleted(callback: (id: string) => void, model: SignalRModel) {
        const name = `${model}${types.deleted}`
        connection.off(name)
        connection.on(name, callback)
        if (connection.state === signalR.HubConnectionState.Disconnected) await startConnection()
    }

    return {
        models,
        types,
        startConnection,
        onCreated,
        onCreatedLLP,
        onUpdated,
        onUpdatedLLP,
        onDeleted,
        onChanged
    }
}