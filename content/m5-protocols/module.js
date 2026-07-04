/* Module 5 - Quantum protocols */
QP.registerModule({
  id: "m5-protocols",
  order: 5,
  accent: "#1E9AA8",
  title: { en: "Quantum protocols", vi: "Giao thức lượng tử" },
  subtitle: {
    en: "Entanglement put to work: Bell inequalities that prove it is real, superdense coding, teleportation, and quantum key distribution with BB84.",
    vi: "Rối được đưa vào sử dụng: bất đẳng thức Bell chứng minh rối là thật, mã hoá siêu đặc, dịch chuyển lượng tử, và phân phối khoá lượng tử với BB84."
  },
  lessons: [
    {
      id: "l1-bell-inequality",
      minutes: 14,
      title: { en: "Bell inequalities: proving entanglement is real", vi: "Bất đẳng thức Bell: chứng minh rối là thật" },
      quiz: [
        {
          q: {
            en: "In the CHSH game, what is the maximum score achievable by any classical strategy using shared local hidden variables?",
            vi: "Trong trò chơi CHSH, điểm tối đa mà mọi chiến lược cổ điển dùng biến ẩn cục bộ chia sẻ có thể đạt là bao nhiêu?"
          },
          options: [
            { en: "2√2 ≈ 2.828", vi: "2√2 ≈ 2.828" },
            { en: "2", vi: "2" },
            { en: "4", vi: "4" },
            { en: "1", vi: "1" }
          ],
          answer: 1,
          explain: {
            en: "Any local-hidden-variable strategy obeys the CHSH inequality |S| ≤ 2. Quantum strategies using an entangled pair can reach the Tsirelson bound 2√2 ≈ 2.828, exceeding the classical limit - this gap is what real experiments measure.",
            vi: "Mọi chiến lược biến ẩn cục bộ đều tuân bất đẳng thức CHSH |S| ≤ 2. Chiến lược lượng tử dùng một cặp rối có thể đạt giới hạn Tsirelson 2√2 ≈ 2.828, vượt ngưỡng cổ điển - chính khoảng chênh này là thứ thí nghiệm thật đo được."
          }
        },
        {
          q: {
            en: "What did the loophole-free Bell tests of 2015 (and the 2022 Nobel-winning work) establish?",
            vi: "Các thí nghiệm Bell không kẽ hở năm 2015 (và công trình đoạt Nobel 2022) đã xác lập điều gì?"
          },
          options: [
            { en: "That information can travel faster than light using entanglement.", vi: "Rằng thông tin có thể truyền nhanh hơn ánh sáng nhờ rối." },
            { en: "That no local-hidden-variable theory can reproduce nature; entanglement is genuinely non-classical.", vi: "Rằng không lý thuyết biến ẩn cục bộ nào tái tạo được tự nhiên; rối thực sự phi cổ điển." },
            { en: "That quantum mechanics is wrong.", vi: "Rằng cơ học lượng tử là sai." },
            { en: "That hidden variables explain all quantum correlations.", vi: "Rằng biến ẩn giải thích mọi tương quan lượng tử." }
          ],
          answer: 1,
          explain: {
            en: "By closing the locality and detection loopholes simultaneously, these experiments ruled out local hidden variables. Nature violates the CHSH bound of 2, so entanglement's correlations cannot be explained by any pre-agreed classical instruction set.",
            vi: "Bằng cách bịt đồng thời kẽ hở cục bộ và kẽ hở phát hiện, các thí nghiệm này loại bỏ biến ẩn cục bộ. Tự nhiên vi phạm ngưỡng CHSH bằng 2, nên tương quan của rối không thể giải thích bằng bất kỳ bộ chỉ dẫn cổ điển thoả thuận trước nào."
          }
        }
      ]
    },
    {
      id: "l2-superdense",
      minutes: 12,
      title: { en: "Superdense coding", vi: "Mã hoá siêu đặc" },
      quiz: [
        {
          q: {
            en: "In superdense coding, how many classical bits can Alice send by transmitting a single qubit, and what does she need beforehand?",
            vi: "Trong mã hoá siêu đặc, Alice gửi được bao nhiêu bit cổ điển khi truyền một qubit, và cô cần gì từ trước?"
          },
          options: [
            { en: "1 bit, needing nothing shared.", vi: "1 bit, không cần chia sẻ gì." },
            { en: "2 bits, but only if she already shares a Bell pair with Bob.", vi: "2 bit, nhưng chỉ khi cô đã chia sẻ sẵn một cặp Bell với Bob." },
            { en: "4 bits, with no prior setup.", vi: "4 bit, không cần chuẩn bị trước." },
            { en: "2 bits, with no entanglement needed.", vi: "2 bit, không cần rối." }
          ],
          answer: 1,
          explain: {
            en: "Superdense coding sends 2 classical bits via 1 qubit, but only because Alice and Bob pre-share an entangled Bell pair. Without that shared entanglement, one qubit carries at most one bit (Holevo bound).",
            vi: "Mã hoá siêu đặc gửi 2 bit cổ điển qua 1 qubit, nhưng chỉ nhờ Alice và Bob đã chia sẻ trước một cặp Bell rối. Không có rối chia sẻ đó, một qubit mang tối đa một bit (giới hạn Holevo)."
          }
        },
        {
          q: {
            en: "Which set of operations does Alice choose from to encode her 2 bits onto her half of the Bell pair?",
            vi: "Alice chọn từ tập phép toán nào để mã hoá 2 bit của mình lên nửa cặp Bell của cô?"
          },
          options: [
            { en: "{I, X, Z, XZ} - one Pauli operation per two-bit message.", vi: "{I, X, Z, XZ} - một phép Pauli cho mỗi thông điệp hai bit." },
            { en: "{H, H, H, H} - four Hadamards.", vi: "{H, H, H, H} - bốn cổng Hadamard." },
            { en: "A measurement in four different bases.", vi: "Một phép đo trong bốn cơ sở khác nhau." },
            { en: "{CNOT} applied four times.", vi: "{CNOT} áp dụng bốn lần." }
          ],
          answer: 0,
          explain: {
            en: "The four two-bit messages 00,01,10,11 map to I, X, Z, XZ applied to Alice's qubit. These rotate the shared state among the four orthogonal Bell states, which Bob distinguishes perfectly with CNOT + H then measurement.",
            vi: "Bốn thông điệp hai bit 00,01,10,11 ứng với I, X, Z, XZ áp lên qubit của Alice. Chúng xoay trạng thái chia sẻ giữa bốn trạng thái Bell trực giao, mà Bob phân biệt hoàn hảo bằng CNOT + H rồi đo."
          }
        }
      ]
    },
    {
      id: "l3-teleportation",
      minutes: 14,
      title: { en: "Quantum teleportation", vi: "Dịch chuyển lượng tử" },
      quiz: [
        {
          q: {
            en: "Why does quantum teleportation NOT allow faster-than-light communication?",
            vi: "Vì sao dịch chuyển lượng tử KHÔNG cho phép truyền tin nhanh hơn ánh sáng?"
          },
          options: [
            { en: "Because the qubit physically flies across space.", vi: "Vì qubit bay vật lý qua không gian." },
            { en: "Because Bob cannot reconstruct the state until Alice's 2 classical bits arrive at light speed or slower.", vi: "Vì Bob không thể tái dựng trạng thái cho tới khi 2 bit cổ điển của Alice tới với tốc độ ánh sáng hoặc chậm hơn." },
            { en: "Because entanglement is destroyed instantly everywhere.", vi: "Vì rối bị phá huỷ tức thời ở mọi nơi." },
            { en: "It actually does allow it.", vi: "Thực ra nó có cho phép." }
          ],
          answer: 1,
          explain: {
            en: "Before the classical bits arrive, Bob's qubit is in a maximally mixed state carrying no information. Only the 2 classical bits - which travel no faster than light - tell him which correction (I, X, Z, or XZ) to apply.",
            vi: "Trước khi các bit cổ điển tới, qubit của Bob ở trạng thái trộn cực đại, không mang thông tin. Chỉ 2 bit cổ điển - vốn không đi nhanh hơn ánh sáng - mới cho Bob biết áp phép hiệu chỉnh nào (I, X, Z, hay XZ)."
          }
        },
        {
          q: {
            en: "Does teleportation violate the no-cloning theorem?",
            vi: "Dịch chuyển lượng tử có vi phạm định lý không nhân bản không?"
          },
          options: [
            { en: "Yes - there are now two copies of the state.", vi: "Có - giờ có hai bản sao của trạng thái." },
            { en: "No - Alice's Bell measurement destroys the original state as it recreates it on Bob's qubit.", vi: "Không - phép đo Bell của Alice phá huỷ trạng thái gốc ngay khi tái tạo nó trên qubit của Bob." },
            { en: "No, because the state is copied but never measured.", vi: "Không, vì trạng thái được sao chép nhưng không đo." },
            { en: "The theorem does not apply to entangled states.", vi: "Định lý không áp dụng cho trạng thái rối." }
          ],
          answer: 1,
          explain: {
            en: "Teleportation moves a state, it does not copy it. The Bell measurement collapses Alice's original qubit, so at the end exactly one copy exists - on Bob's side. One in, one out: fully consistent with no-cloning.",
            vi: "Dịch chuyển di chuyển một trạng thái, không sao chép nó. Phép đo Bell làm sập qubit gốc của Alice, nên cuối cùng chỉ tồn tại đúng một bản - ở phía Bob. Vào một, ra một: hoàn toàn nhất quán với định lý không nhân bản."
          }
        }
      ]
    },
    {
      id: "l4-bb84",
      minutes: 13,
      title: { en: "Quantum key distribution: BB84", vi: "Phân phối khoá lượng tử: BB84" },
      quiz: [
        {
          q: {
            en: "In BB84, how is an eavesdropper (Eve) detected?",
            vi: "Trong BB84, kẻ nghe lén (Eve) bị phát hiện bằng cách nào?"
          },
          options: [
            { en: "Eve's measuring in the wrong basis disturbs the states, raising the error rate on a shared sample.", vi: "Việc Eve đo sai cơ sở làm nhiễu các trạng thái, làm tăng tỉ lệ lỗi trên một mẫu chia sẻ." },
            { en: "Eve triggers a physical alarm on the fibre.", vi: "Eve kích hoạt còi báo động vật lý trên sợi quang." },
            { en: "Eve cannot ever be detected.", vi: "Không bao giờ phát hiện được Eve." },
            { en: "Alice counts how many photons are missing.", vi: "Alice đếm xem thiếu bao nhiêu photon." }
          ],
          answer: 0,
          explain: {
            en: "Because the two bases are conjugate, Eve does not know which one Alice used. Measuring in the wrong basis and resending disturbs the qubit; Alice and Bob compare a random subset of their bits and a raised error rate (about 25% if Eve intercepts everything) reveals her.",
            vi: "Vì hai cơ sở là liên hợp, Eve không biết Alice dùng cơ sở nào. Đo sai cơ sở rồi gửi lại sẽ làm nhiễu qubit; Alice và Bob so một tập con ngẫu nhiên các bit và tỉ lệ lỗi tăng lên (khoảng 25% nếu Eve chặn hết) sẽ lộ ra cô ta."
          }
        },
        {
          q: {
            en: "Which principle fundamentally makes BB84 secure?",
            vi: "Nguyên lý nào về căn bản khiến BB84 an toàn?"
          },
          options: [
            { en: "The difficulty of factoring large numbers.", vi: "Độ khó của việc phân tích số lớn." },
            { en: "The no-cloning theorem: Eve cannot copy an unknown qubit to measure it undisturbed.", vi: "Định lý không nhân bản: Eve không thể sao chép một qubit chưa biết để đo mà không làm nhiễu." },
            { en: "The speed of the quantum channel.", vi: "Tốc độ của kênh lượng tử." },
            { en: "A very long shared password agreed in advance.", vi: "Một mật khẩu chia sẻ rất dài thoả thuận trước." }
          ],
          answer: 1,
          explain: {
            en: "BB84's security rests on physics, not computational hardness. No-cloning forbids Eve from duplicating a qubit to keep one and forward the other, so any information she gains necessarily disturbs the transmitted states and shows up as errors.",
            vi: "An toàn của BB84 dựa trên vật lý, không phải độ khó tính toán. Định lý không nhân bản cấm Eve nhân đôi một qubit để giữ một bản và chuyển tiếp bản kia, nên mọi thông tin cô thu được tất yếu làm nhiễu các trạng thái truyền đi và hiện ra thành lỗi."
          }
        }
      ]
    }
  ]
});
