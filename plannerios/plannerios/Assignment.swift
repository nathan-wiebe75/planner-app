//
//  Assignment.swift
//  plannerios
//
//  Created by Nathan Wiebe on 9/4/26.
//

import SwiftUI

enum Priority: Int, Codable {
    case low = 0
    case medium = 1
    case high = 2
}

struct Assignment: View{
    let id: Int
    let name: String
    let course: String
    let dueDate: Date
    @State private var isComplete: Bool = false
    let priority: Priority
    
    
    var body: some View{
        HStack{
            Image(systemName: "folder.circle")
                .font(.largeTitle)
                .frame(width: 50)
            VStack(alignment: .leading, spacing: 2) {
                Text("\(name)")
                    //.font(.title)
                    .lineLimit(1)
                    .truncationMode(.tail)
                HStack(spacing: 4) {
                    Image(systemName: "calendar")
                        .font(.caption)
                    Text(dueDate, format: .dateTime.year().month(.abbreviated).day())
                        .font(.caption)
                        .foregroundStyle(.secondary)
                        .lineLimit(1)
                        .truncationMode(.tail)
                }
            }
            .layoutPriority(1)
            Spacer()
            Button(action: { isComplete.toggle() }) {
                Image(systemName: isComplete ? "checkmark.circle.fill" : "checkmark.circle")
                    .font(.largeTitle)
                    .foregroundColor(isComplete ? .green : .white)
            }
        }
        .foregroundStyle(Color.white)
        
        .padding()
        .background{
            RoundedRectangle(cornerRadius: 12)
                .foregroundStyle(.tint)
                .opacity(0.25)
                .brightness(-0.4)
        }

        //.padding()
    }
}
#Preview {
    Assignment(id: 1, name: "Artificial Intelligence", course: "Social Implications of Computers", dueDate: Calendar.current.date(from: DateComponents(year: 2026, month: 9, day: 20))!, priority: Priority.high)
}

