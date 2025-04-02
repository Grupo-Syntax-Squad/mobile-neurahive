import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Linking
} from "react-native"
import React from "react"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { RootStackParamList } from "@/app/navigation/types"

export default function TermosDeUso() {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>()

    return (
        <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.container}
        >
            <View style={styles.content}>
                <Text style={styles.title}>Termos e Condições de Uso</Text>

                <Text style={styles.subtitle}>1. Aceitação dos Termos</Text>
                <Text style={styles.description}>
                    Ao acessar ou utilizar os serviços fornecidos por esta aplicação, você concorda em
                    cumprir os presentes Termos e Condições de Uso. Caso não concorde com algum dos
                    termos aqui descritos, não utilize a aplicação. A utilização da aplicação implica
                    na aceitação integral desses termos.
                </Text>

                <Text style={styles.subtitle}>2. Modificações dos Termos</Text>
                <Text style={styles.description}>
                    A qualquer momento, a equipe responsável por esta aplicação pode atualizar ou
                    modificar estes Termos de Uso. Quaisquer alterações serão comunicadas através da
                    plataforma, sendo de sua responsabilidade revisar periodicamente os termos para
                    verificar eventuais mudanças. O uso contínuo da aplicação após a publicação de
                    alterações implica na aceitação das novas condições.
                </Text>

                <Text style={styles.subtitle}>3. Objetivo da Aplicação</Text>
                <Text style={styles.description}>
                    A aplicação foi desenvolvida com fins acadêmicos, proporcionando uma ferramenta
                    para a realização de pesquisas, atividades educacionais e outras finalidades
                    relacionadas ao seu contexto acadêmico. O uso da aplicação é exclusivo para fins
                    educacionais e não poderá ser utilizado para atividades comerciais ou ilegais.
                </Text>

                <Text style={styles.subtitle}>4. Responsabilidades do Usuário</Text>
                <Text style={styles.description}>
                    O usuário se compromete a:
                    {"\n"}- Fornecer informações corretas e verídicas ao utilizar a aplicação.
                    {"\n"}- Não realizar atividades ilegais ou prejudiciais à plataforma, aos demais
                    usuários ou a terceiros.
                    {"\n"}- Não infringir direitos autorais, marcas registradas ou outros direitos de
                    propriedade intelectual de terceiros.
                    {"\n"}- Manter sua senha e dados de login confidenciais, assumindo total
                    responsabilidade por todas as atividades realizadas sob sua conta.
                </Text>

                <Text style={styles.subtitle}>5. Direitos de Propriedade Intelectual</Text>
                <Text style={styles.description}>
                    Os conteúdos, marcas, logotipos, design e outros materiais presentes na aplicação
                    são de propriedade exclusiva dos desenvolvedores ou de seus licenciadores. O
                    usuário não está autorizado a copiar, reproduzir, distribuir ou modificar qualquer
                    material da aplicação sem permissão expressa.
                </Text>

                <Text style={styles.subtitle}>6. Privacidade e Proteção de Dados</Text>
                <Text style={styles.description}>
                    A aplicação coleta dados pessoais dos usuários de acordo com sua política de
                    privacidade. Ao utilizar a plataforma, você consente com o tratamento de seus dados
                    conforme estabelecido nesta política. É sua responsabilidade garantir que as
                    informações fornecidas sejam precisas e atualizadas.
                </Text>

                <Text style={styles.subtitle}>7. Limitação de Responsabilidade</Text>
                <Text style={styles.description}>
                    A equipe de desenvolvimento não se responsabiliza por danos diretos, indiretos,
                    incidentais, especiais ou consequenciais que possam resultar do uso ou incapacidade
                    de uso da aplicação. O usuário utiliza a plataforma por sua própria conta e risco.
                </Text>

                <Text style={styles.subtitle}>8. Encerramento do Uso</Text>
                <Text style={styles.description}>
                    A equipe de desenvolvimento pode, a seu critério, suspender ou encerrar o acesso do
                    usuário à aplicação, sem aviso prévio, em caso de violação destes Termos de Uso ou de
                    qualquer ato que comprometa o funcionamento adequado da plataforma.
                </Text>

                <Text style={styles.subtitle}>9. Legislação Aplicável</Text>
                <Text style={styles.description}>
                    Estes Termos de Uso são regidos pela legislação vigente do país em que a aplicação
                    está sendo utilizada. Em caso de disputas, as partes concordam em se submeter aos
                    tribunais competentes da jurisdição em que a aplicação foi desenvolvida.
                </Text>

                <Text style={styles.subtitle}>10. Contato</Text>
                <Text style={styles.description}>
                    Em caso de dúvidas ou solicitações relacionadas a estes Termos de Uso, o usuário pode
                    entrar em contato com a equipe de suporte por meio dos canais fornecidos na aplicação.
                </Text>
                
                <TouchableOpacity 
                    style={styles.saveButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.buttonText}>Voltar</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 20,
    },
    content: {
        paddingVertical: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 30,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 15,
        marginBottom: 5,
    },
    description: {
        fontSize: 14,
        color: "#666",
        marginBottom: 15,
        lineHeight: 20,
    },
    saveButton: {
        marginTop: 20,
        alignSelf: "center",
        backgroundColor: "#007BFF",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        textAlign: "center",
    },
})
