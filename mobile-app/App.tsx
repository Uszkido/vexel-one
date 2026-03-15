const TRANSLATIONS = {
  en: {
    welcome: 'Welcome to Vexel One. Your AI Operating System.',
    placeholder: 'Ask Vexel One anything...',
    instinct: 'Vexel Instinct: Logistics delay pattern detected (88% confidence).',
    live: 'Live',
    os: 'AI OPERATING SYSTEM',
  },
  ha: {
    welcome: 'Barka da zuwa Vexel One. Tsarin Ayyukan AI Na ku.',
    placeholder: 'Tambayi Vexel One kowane abu...',
    instinct: 'Sanarwar Instinct: An gano jinkiri a harkar sufuri (88%).',
    live: 'Yanzu',
    os: 'TSARIN AI NA AIKI',
  }
};

export default function App() {
  const [lang, setLang] = useState<'en' | 'ha'>('en');
  const t = TRANSLATIONS[lang];
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', text: t.welcome }
  ]);

  const toggleLang = () => setLang(l => l === 'en' ? 'ha' : 'en');

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', text: lang === 'en' ? 'Processing with Vexel AI...' : 'Ina nazari ta amfani da Vexel AI...' }]);
    }, 1000);
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
            <Text style={styles.appSubtitle}>{t.os}</Text>
          </View>
          <TouchableOpacity onPress={toggleLang} style={styles.langToggle}>
            <Text style={styles.langToggleText}>{lang === 'en' ? 'HA' : 'EN'}</Text>
          </TouchableOpacity>
          <View style={styles.liveTag}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>{t.live}</Text>
          </View>
        </View>

        {/* Module Chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipRow}>
          {['🤖 Swarm', '🌐 Twin', '🎙️ Voice', '🚦 Morale', '🛡️ Group', '🥬 Farms'].map(m => (
            <TouchableOpacity key={m} style={styles.chip}>
              <Text style={styles.chipText}>{m}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Vexel Instinct Banner */}
      <TouchableOpacity style={styles.instinctBanner}>
        <View style={styles.instinctIcon}>
          <Text style={{ fontSize: 14 }}>⚡</Text>
        </View>
        <Text style={styles.instinctText}>{t.instinct}</Text>
      </TouchableOpacity>

      {/* Messages */}
      <ScrollView
        style={styles.chatArea}
        contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((msg, i) => (
          <View key={i} style={[styles.messageWrapper, msg.role === 'user' ? { alignItems: 'flex-end' } : { alignItems: 'flex-start' }]}>
            <View style={[styles.bubble, msg.role === 'user' ? styles.userBubble : styles.aiBubble]}>
              <Text style={styles.messageText}>{msg.text}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Input Bar */}
      <View style={styles.inputSection}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder={t.placeholder}
            placeholderTextColor="#444"
            multiline
          />
          <TouchableOpacity onPress={sendMessage} style={styles.sendBtn}>
            <Text style={styles.sendIcon}>↑</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#050507' },
  header: { paddingTop: 60, paddingBottom: 20, paddingHorizontal: 20, backgroundColor: '#0d0d12' },
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 20 },
  logoCircle: { width: 44, height: 44, borderRadius: 14, backgroundColor: '#4f46e5', alignItems: 'center', justifyContent: 'center', shadowColor: '#4f46e5', shadowBlur: 20, shadowOpacity: 0.5 },
  logoText: { color: '#fff', fontWeight: '900', fontSize: 20 },
  appName: { color: '#fff', fontSize: 22, fontWeight: '900' },
  appSubtitle: { color: '#6366f1', fontSize: 10, letterSpacing: 2, fontWeight: '800' },
  langToggle: { marginLeft: 'auto', backgroundColor: '#1a1a25', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10, borderWeight: 1, borderColor: '#333' },
  langToggleText: { color: '#818cf8', fontSize: 12, fontWeight: '900' },
  liveTag: { marginLeft: 10, flexDirection: 'row', alignItems: 'center', backgroundColor: '#10b98115', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6, gap: 6, borderColor: '#10b98130', borderWidth: 1 },
  liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#10b981' },
  liveText: { color: '#10b981', fontSize: 11, fontWeight: '800', textTransform: 'uppercase' },
  chipRow: { marginTop: 5 },
  chip: { backgroundColor: '#ffffff08', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 10, marginRight: 10, borderWidth: 1, borderColor: '#ffffff10' },
  chipText: { color: '#ffffff90', fontSize: 13, fontWeight: '700' },
  instinctBanner: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 16, marginHorizontal: 20, marginTop: -10, backgroundColor: '#ef444410', borderRadius: 16, borderWidth: 1, borderColor: '#ef444420' },
  instinctIcon: { width: 28, height: 28, borderRadius: 8, backgroundColor: '#ef444420', alignItems: 'center', justifyContent: 'center' },
  instinctText: { color: '#fca5a5', fontSize: 12, flex: 1, fontWeight: '600' },
  chatArea: { flex: 1 },
  messageWrapper: { marginBottom: 16 },
  bubble: { maxWidth: '85%', padding: 16, borderRadius: 20 },
  userBubble: { backgroundColor: '#4f46e5' },
  aiBubble: { backgroundColor: '#13131a', borderWeight: 1, borderColor: '#ffffff05' },
  messageText: { color: '#fff', fontSize: 15, lineHeight: 22 },
  inputSection: { padding: 20, paddingBottom: 40, borderTopWidth: 1, borderColor: '#ffffff05' },
  inputContainer: { flexDirection: 'row', gap: 12, alignItems: 'flex-end', backgroundColor: '#0d0d12', padding: 8, borderRadius: 24, borderWidth: 1, borderColor: '#ffffff08' },
  input: { flex: 1, color: '#fff', paddingHorizontal: 16, paddingVertical: 12, fontSize: 15, maxHeight: 120 },
  sendBtn: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#4f46e5', alignItems: 'center', justifyContent: 'center' },
  sendIcon: { color: '#fff', fontSize: 24, fontWeight: '700' },
});
