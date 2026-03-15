import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import React, { useState } from 'react';

export default function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Welcome to Vexel One. Your AI Operating System. How can I assist you today?' }
  ]);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages(prev => [
      ...prev,
      { role: 'user', text: input },
      { role: 'assistant', text: 'Processing with Vexel AI engine...' }
    ]);
    setInput('');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoRow}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>V</Text>
          </View>
          <View>
            <Text style={styles.appName}>Vexel One</Text>
            <Text style={styles.appSubtitle}>AI OPERATING SYSTEM</Text>
          </View>
          <View style={styles.liveTag}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>Live</Text>
          </View>
        </View>

        {/* Module Chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipRow}>
          {['🤖 Swarm AI', '🌐 Twin Sim', '🎙️ Voice Clone', '🚦 Morale', '🤝 B2B', '👓 AR Overlay'].map(m => (
            <TouchableOpacity key={m} style={styles.chip}>
              <Text style={styles.chipText}>{m}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Vexel Instinct Banner */}
      <View style={styles.instinctBanner}>
        <Text style={styles.instinctEmoji}>⚡</Text>
        <Text style={styles.instinctText}>
          <Text style={{ color: '#f87171' }}>Vexel Instinct: </Text>
          Logistics delay pattern detected (88% confidence). Tap to simulate.
        </Text>
      </View>

      {/* Messages */}
      <ScrollView style={styles.chatArea} contentContainerStyle={{ padding: 16, gap: 12 }}>
        {messages.map((msg, i) => (
          <View key={i} style={[styles.bubble, msg.role === 'user' ? styles.userBubble : styles.aiBubble]}>
            {msg.role === 'assistant' && (
              <View style={styles.aiAvatar}>
                <Text>✨</Text>
              </View>
            )}
            <View style={[styles.bubbleText, msg.role === 'user' ? { backgroundColor: '#4f46e5' } : { backgroundColor: '#1f1f23' }]}>
              <Text style={{ color: '#fff', fontSize: 14, lineHeight: 20 }}>{msg.text}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Input Bar */}
      <View style={styles.inputBar}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Ask Vexel One anything..."
          placeholderTextColor="#555"
          multiline
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendBtn}>
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>→</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0b' },
  header: { paddingTop: 60, paddingBottom: 16, paddingHorizontal: 20, backgroundColor: '#0f0f11', borderBottomWidth: 1, borderColor: '#ffffff08' },
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
  logoCircle: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#4f46e5', alignItems: 'center', justifyContent: 'center' },
  logoText: { color: '#fff', fontWeight: '900', fontSize: 18 },
  appName: { color: '#fff', fontSize: 20, fontWeight: '800' },
  appSubtitle: { color: '#6366f1', fontSize: 9, letterSpacing: 2, fontWeight: '700' },
  liveTag: { marginLeft: 'auto', flexDirection: 'row', alignItems: 'center', backgroundColor: '#16a34a22', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4, gap: 5, borderColor: '#16a34a44', borderWidth: 1 },
  liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#22c55e' },
  liveText: { color: '#22c55e', fontSize: 10, fontWeight: '700' },
  chipRow: {},
  chip: { backgroundColor: '#ffffff0d', borderRadius: 20, paddingHorizontal: 14, paddingVertical: 8, marginRight: 8, borderWidth: 1, borderColor: '#ffffff10' },
  chipText: { color: '#ffffffaa', fontSize: 12, fontWeight: '600' },
  instinctBanner: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 14, backgroundColor: '#1a0a1a', borderBottomWidth: 1, borderColor: '#ffffff08' },
  instinctEmoji: { fontSize: 18 },
  instinctText: { color: '#ffffffaa', fontSize: 12, flex: 1, lineHeight: 18 },
  chatArea: { flex: 1 },
  bubble: { flexDirection: 'row', gap: 10, marginBottom: 12 },
  userBubble: { justifyContent: 'flex-end' },
  aiBubble: { justifyContent: 'flex-start' },
  aiAvatar: { width: 34, height: 34, borderRadius: 10, backgroundColor: '#4f46e5', alignItems: 'center', justifyContent: 'center', alignSelf: 'flex-end' },
  bubbleText: { maxWidth: '80%', padding: 12, borderRadius: 16 },
  inputBar: { flexDirection: 'row', gap: 10, padding: 16, borderTopWidth: 1, borderColor: '#ffffff08', backgroundColor: '#0f0f11', alignItems: 'flex-end' },
  input: { flex: 1, backgroundColor: '#1a1a1c', color: '#fff', borderRadius: 14, padding: 12, fontSize: 14, maxHeight: 100, borderWidth: 1, borderColor: '#ffffff10' },
  sendBtn: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#4f46e5', alignItems: 'center', justifyContent: 'center' },
});
